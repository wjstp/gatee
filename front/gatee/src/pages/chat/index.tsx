import React, { useEffect, useRef, useState } from 'react';
import {useNavigate} from "react-router-dom";
import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import ChatDate from "@pages/chat/components/ChatDate";
import { ChatSample } from "@constants/index";
import { ChatContent, ChatDateLine, ChatType } from "@type/index";
import { useFamilyStore } from "@store/useFamilyStore";

import SockJS from "sockjs-client";
import firebase from "../../firebase-config";
import 'firebase/database';
import {start} from "@craco/craco/dist/lib/cra";
import Loading from "@components/Loading";


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

  const { familyId } = useFamilyStore();
  const chatRef = firebase.database().ref(`chat/${familyId}/messages`);

  const PAGE_SIZE: number = 3;
  const [messages, setMessages] = useState<(ChatContent | ChatDateLine)[]>([]);
  const [startKey, setStartKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    connect();

    if (familyId) {
      loadInitialMessages();
    }

    // Firebase 실시간 이벤트 수신 등록
    chatRef.limitToLast(1).on('child_added', handleAddChatData);
    chatRef.on('child_changed', handleUpdateChatData);

    return () => {
      if (ws.current) {
        // WebSocket 연결 해제
        ws.current.close();
      }
      // Firebase 실시간 이벤트 수신 해제
      chatRef.off();
    }
  }, []);

  // WebSocket 연결
  const connect = () => {
    ws.current = new SockJS(`${WS_URL}?Token=${localStorage.getItem('accessToken')}`);

    // WebSocket 연결 상태 리스너
    ws.current.onopen = handleWebSocketOpen;
    ws.current.onclose = handleWebSocketClose;
  }

  // WebSocket 연결 이벤트 핸들러
  const handleWebSocketOpen = () => {
    console.log("<<< WS CONNECT");

    // 연결 성공 시 변수 초기화
    reconnectTimeInterval = Math.random() * MAX_TIME_INTERVAL;
    reconnectAttempts = 0;
    setIsReconnecting(false);
  }

  // WebSocket 연결 해제 이벤트 핸들러
  const handleWebSocketClose = (e: CloseEvent) => {
    // 소켓 정상 종료 여부 판별
    if (e.wasClean) {
      console.log(">>> WS DISCONNECT");
      return;
    }

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
  const handleSendMessage = (newMessages: ChatContent) => {
    if (ws.current) {
      ws.current.send(JSON.stringify(newMessages));
    } else {
      console.log("WebSocket is not open or reconnecting");
    }
  };
  
  // 채팅 입장 시 이전 메시지 로드
  const loadInitialMessages = () => {
    chatRef
      .orderByKey()
      .limitToLast(PAGE_SIZE)
      .once('value')
      .then((snapshot) => {
        const messagesArray: (ChatContent | ChatDateLine)[] = [];
        let isFirst: boolean = true;

        snapshot.forEach((childSnapshot) => {
          // 첫 번째 메시지는 건너뜀
          if (isFirst) {
            isFirst = false;
            return;
          }
          messagesArray.unshift(childSnapshot.val());
        });

        setMessages(messagesArray);
        setStartKey(Object.keys(snapshot.val())[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 스크롤 시 이전 메시지 로드
  const loadMoreMessages = () => {
    setIsLoading(true);

    chatRef
      .orderByKey()
      .endAt(startKey)
      .limitToLast(PAGE_SIZE + 1)
      .once('value')
      .then((snapshot) => {
        const messagesArray: (ChatContent | ChatDateLine)[] = [];
        let isFirst: boolean = true;

        snapshot.forEach((childSnapshot) => {
          if (isFirst) {
            isFirst = false;
            return;
          }
          messagesArray.unshift(childSnapshot.val());
        });

        setMessages((prevMessages) => [...prevMessages, ...messagesArray.slice(1)]);
        setStartKey(Object.keys(snapshot.val())[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  // 메시지 추가 이벤트 수신 핸들러
  const handleAddChatData = (snapshot: any) => {
    const newMessage = snapshot.val();
    setMessages((prevMessages) => [newMessage, ...prevMessages]);
  }

  // 채팅 내역 수정 이벤트 수신 핸들러
  const handleUpdateChatData = (snapshot: any) => {
  }

  // 이전 채팅과 현재 채팅의 보낸 사람이 같은지 여부에 따라 props 설정
  const setPrevProps = (prevChat: ChatContent, currentChat: ChatContent) => {
    if (prevChat) {
      return { isPrevSender: prevChat.sender === currentChat.sender };
    }
    return { isPrevSender: false };
  };

  // 채팅 버블 렌더링
  const renderChatBubble = messages.map((chat: ChatContent | ChatDateLine, index: number) => {
    const prevChat: ChatContent | ChatDateLine | null = index < ChatSample.length - 1 ? ChatSample[index + 1] : null;

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
      {isReconnecting? <Loading/> : null}

      <div className="chat__main">
        {renderChatBubble}
      </div>

      <ChatInput onSendMessage={handleSendMessage}/>
    </div>
  );
}

export default ChatIndex;