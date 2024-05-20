import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import ChatDate from "@pages/chat/components/ChatDate";
import { ChatContent, ChatDateLine, ChatType, ChatSendMessage } from "@type/index";
import { useFamilyStore } from "@store/useFamilyStore";
import { useMemberStore } from "@store/useMemberStore";
import getUserInfo from "@utils/getUserInfo";
import Loading from "@components/Loading";
import { FaArrowDown } from "react-icons/fa";
import ScrollAnimation from "@assets/images/animation/scroll_animation.json";
import useObserver from "@hooks/useObserver";

import SockJS from "sockjs-client";
import firebase from "../../firebase-config";
import 'firebase/database';
import { useInView } from 'react-intersection-observer';
import Lottie from "lottie-react";

const ChatIndex = () => {
  const { REACT_APP_API_URL } = process.env;
  const navigate = useNavigate();

  const WS_URL: string = `${REACT_APP_API_URL}/chat`;
  const ws = useRef<WebSocket | null>(null);

  const MAX_TIME_INTERVAL: number = 1000;
  const MAX_RECONNECT_ATTEMPTS: number = 5;
  let reconnectTimeInterval: number = Math.random() * MAX_TIME_INTERVAL;
  let reconnectAttempts: number = 0;
  const [isReconnecting, setIsReconnecting] = useState<boolean>(false);

  const { familyId, familyInfo } = useFamilyStore();
  const { myInfo } = useMemberStore();

  const PAGE_SIZE: number = 30;
  const chatRef = firebase.database().ref(`chat/${familyId}/messages`);
  const [messages, setMessages] = useState<(ChatContent | ChatDateLine)[]>([]);
  const [startKey, setStartKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGetAllData, setIsGetAllData] = useState<boolean>(false);
  const [isEntryChat, setIsEntryChat] = useState<boolean>(false);
  const [isNoMessage, setIsNoMessage] = useState<boolean>(false);

  const [isShowDateLine, setIsShowDateLine] = useState<boolean>(false);
  const [dateLine, setDateLine] = useState<string>("");

  const [isShowPreviewMessage, setIsShowPreviewMessage] = useState<boolean>(false);
  const [previewMessage, setPreviewMessage] = useState<{ sender: string | undefined, content: string } | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const { ref, inView } = useInView();

  useEffect(() => {
    // WebSocket 연결
    connect();

    return () => {
      if (ws.current) {
        // WebSocket 연결 해제
        ws.current.close();
      }
      // Firebase 실시간 이벤트 리스너 해제
      chatRef.off('child_changed');
      chatRef.off('child_added');
    }
  }, []);

  useEffect(() => {
    if (familyId) {
      // Firebase 실시간 이벤트 리스너 등록
      chatRef.limitToLast(1).on('child_added', handleAddChatData);
      chatRef.on('child_changed', handleUpdateChatData);

      // 메시지 조회
      loadMessages();
    }
  }, [familyId]);

  useEffect(() => {
    if (messages.length === 0) {
      setIsNoMessage(true);
    } else {
      setIsNoMessage(false);

      // 렌더링된 메시지 중 가장 오래된 메시지가 date line이 아니라면 date line 표시
      if (messages[messages.length - 1].messageType !== ChatType.DATE_LINE) {
        setIsShowDateLine(true);
        setDateLine((messages[messages.length - 1] as ChatContent).currentTime);
      } else {
        setIsShowDateLine(false);
      }
    }
  }, [messages]);

  // WebSocket 연결
  const connect = () => {
    try {
      ws.current = new SockJS(`${WS_URL}?Token=${localStorage.getItem('accessToken')}`);

      // WebSocket 연결 상태 리스너
      ws.current.onopen = handleWebSocketOpen;
      ws.current.onclose = handleWebSocketClose;
    } catch (error) {
      console.error("Failed to connect to WebSocket:", error);
      navigate("/main");
    }
  }

  // WebSocket 연결 성공 이벤트 핸들러
  const handleWebSocketOpen = () => {
    console.log("<<< WS CONNECT");

    // 연결 성공 시 변수 초기화
    reconnectTimeInterval = Math.random() * MAX_TIME_INTERVAL;
    reconnectAttempts = 0;
    setIsReconnecting(false);
  }

  // WebSocket 연결 해제 이벤트 핸들러
  const handleWebSocketClose = (event: CloseEvent) => {
    // 소켓 정상 종료 여부 판별
    if (event.wasClean) {
      console.log(">>> WS DISCONNECT");
      return;
    }

    // 소켓이 정상 종료되지 않았다면
    // 재연결 요청 횟수 증가
    reconnectAttempts++;
    
    // 지수 백오프
    reconnectTimeInterval *= 2;

    if (!isReconnecting && reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
      console.log("WS RECONNECTING...");
      setIsReconnecting(true);

      setTimeout(() => {
        // 재연결 시도
        connect();
      }, reconnectTimeInterval);
    } else {
      // 최대 횟수에 도달하면 재연결 시도를 중단하고 메인 페이지로 이동
      console.log("Reached maximum reconnection attempts");
      navigate("/main");
    }
  };

  // WebSocket 메시지 전송
  const send = (newMessages: ChatSendMessage) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(newMessages));
      scrollToBottom();
    } else {
      console.log("WebSocket is not open or reconnecting");
    }
  };

  // 채팅방 이전 메시지 불러오기
  const loadMessages = () => {
    if (isLoading) return;

    // 데이터 로드 시작
    setIsLoading(true);

    let query = chatRef.orderByKey().limitToLast(PAGE_SIZE);

    if (startKey) {
      query = query.endAt(startKey);
    }

    query.once('value')
      .then((snapshot) => {
        // 새로운 메시지 배열
        const messagesArray: (ChatContent | ChatDateLine)[] = [];

        snapshot.forEach((childSnapshot) => {
          const newMessage = { id: childSnapshot.key, ...childSnapshot.val() };
          if (messagesArray.length > 0 && newMessage.messageType === ChatType.DATE_LINE && messagesArray[0].messageType === ChatType.DATE_LINE) {
          } else {
            messagesArray.unshift(newMessage);
          }
        });

        if (messagesArray.length === 0) {
          setIsGetAllData(true);
        } else if (messagesArray.length === 1) {
          setIsGetAllData(true);
          messagesArray.pop();
        }

        if (!isEntryChat) {
          messagesArray.shift();
        }

        // 메시지 저장
        setMessages((prevMessages) => [...prevMessages, ...messagesArray]);

        // 새로운 startKey를 설정
        const newStartKey: string = Object.keys(snapshot.val())[0];
        setStartKey(newStartKey);

        // 데이터 로드 종료
        setIsLoading(false);
        setIsEntryChat(true);
      })
      .catch(() => {
        // No message
        setIsLoading(false);
        setIsGetAllData(true);
        setIsEntryChat(true);
      });
  };

  // 스크롤 타겟
  const { target } = useObserver({
    fetcher: loadMessages,
    dependency: messages,
    isLoading
  })

  // 메시지 추가 이벤트 수신 핸들러
  const handleAddChatData = (snapshot: firebase.database.DataSnapshot) => {
    const newMessage: ChatContent | ChatDateLine = { id: snapshot.key, ...snapshot.val() };
    setMessages(prevMessages => [newMessage, ...prevMessages]);

    // 메시지 프리뷰 설정
    handleShowPreview(newMessage);
  }

  const handleShowPreview = (newMessage: ChatContent | ChatDateLine) => {
    if (newMessage.messageType === ChatType.DATE_LINE) return;
    if ("sender" in newMessage && newMessage.sender === myInfo.memberId) return;

    if (("sender" in newMessage)) {
      const sender: string | undefined = getUserInfo(familyInfo, newMessage.sender)?.nickname;
      let content: string = "";

      if (newMessage.messageType === ChatType.MESSAGE && "content" in newMessage) {
        content = newMessage.content;
      } else if (newMessage.messageType === ChatType.FILE) {
        content = "(사진)";
      } else if (newMessage.messageType === ChatType.EMOJI && "content" in newMessage) {
        content = `(이모티콘) ${newMessage.content}`;
      } else if (newMessage.messageType === ChatType.APPOINTMENT && "content" in newMessage) {
        content = `[${newMessage.content}] 가 등록되었습니다.`;
      } else if (newMessage.messageType === ChatType.ALARM && "content" in newMessage) {
        content = `[${newMessage.content}] 가 종료되었습니다.`;
      }
      setPreviewMessage({sender, content});
      setIsShowPreviewMessage(true);
    }
  }

  // 메시지 수정 이벤트 수신 핸들러
  const handleUpdateChatData = (snapshot: any) => {
    const updatedMessage = { id: snapshot.key, ...snapshot.val() };

    // messages 배열에서 변경된 채팅 메시지를 찾아서 업데이트
    setMessages((prevMessages) => prevMessages.map((message: ChatContent | ChatDateLine) => {
      if (message.id === updatedMessage.id) {
        // 변경된 채팅 메시지의 정보로 업데이트
        return updatedMessage;
      }
      return message;
    }));
  }

  // 하단 영역인지 확인
  useEffect(() => {
    if (inView) {
      // 스크롤이 맨 아래인 경우 프리뷰 제거
      setIsShowPreviewMessage(false);
    }
  }, [inView]);

  // 스크롤 맨 아래로 내리기
  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
      setPreviewMessage(null);
    }
  };

  // 이전 채팅과 현재 채팅의 보낸 사람이 같은지 여부에 따라 props 설정
  const setPrevProps = (prevChat: ChatContent, currentChat: ChatContent) => {
    if (prevChat) {
      return { isPrevSender: prevChat.sender === currentChat.sender };
    }
    return { isPrevSender: false };
  };

  // 채팅 버블 렌더링
  const renderChatBubble = messages.map((chat: ChatContent | ChatDateLine, index: number) => {
    const prevChat: ChatContent | ChatDateLine | null = index < messages.length - 1 ? messages[index + 1] : null;

    switch (chat.messageType) {
      case ChatType.DATE_LINE:
        return (
          <ChatDate
            key={index}
            chat={chat as ChatDateLine}
          />
        );
      default:
        return (
          <BubbleChat
            key={index}
            chat={chat as ChatContent}
            {...setPrevProps(prevChat as ChatContent, chat as ChatContent)}
          />
        );
    }
  });

  return (
    <div className="chat">
      {/*로딩*/}
      {isReconnecting? <Loading/> : null}
      
      {/*메시지 없을 경우*/}
      {isNoMessage && (
        <div className="chat__no-message">가족들과 대화를 나눠 보세요 ♪</div>
      )}

      {/*채팅 메인*/}
      <div className="chat__main">
        {/*채팅 하단*/}
        <div ref={bottomRef}></div>

        {/*채팅 하단 영역*/}
        <div ref={ref} className="chat__main__bottom"></div>
        
        {/*채팅 내용*/}
        {renderChatBubble}

        { (isShowDateLine && messages) &&
            <ChatDate chat={{
              id: "",
              messageType: ChatType.DATE_LINE,
              currentTime: dateLine,
            }}/>
        }

        {/*DB에 더 불러올 데이터가 존재하고 데이터가 페이지 크기를 넘어갔을 때 표시*/}
        {(!isGetAllData && messages.length >= PAGE_SIZE - 1) && (
          <div className="scroll-target" ref={target} >
            <Lottie className="scroll-target__animation" animationData={ScrollAnimation}/>
          </div>
        )}

        {/*아래로 이동 버튼*/}
        {(!inView && !isShowPreviewMessage) && (
          <div
            className="chat__main__scroll-down">
            <button
              className="chat__main__scroll-down-button"
              onClick={scrollToBottom}
            >
              <FaArrowDown size={17}/>
            </button>
          </div>
        )}

        {/*새로운 메시지 프리뷰*/}
        {(!inView && isShowPreviewMessage && previewMessage) && (
          <button
            className="chat__main__preview"
            onClick={scrollToBottom}
          >
            <span className="chat__main__preview__sender">{previewMessage?.sender}</span>
            <span className="chat__main__preview__content">{previewMessage?.content}</span>
          </button>
        )}
      </div>

      {/*채팅 입력*/}
      <ChatInput onSendMessage={send}/>
    </div>
  );
}

export default ChatIndex;