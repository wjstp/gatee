import React, { useEffect, useRef, useState } from 'react';
import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import ChatDate from "@pages/chat/components/ChatDate";
import { ChatSample } from "@constants/index";
import { ChatContent, ChatDateLine, ChatType } from "@type/index";
import { useFamilyStore } from "@store/useFamilyStore";

import SockJS from "sockjs-client";
import firebase from "../../firebase-config";
import 'firebase/database';


const ChatIndex = () => {
  const { REACT_APP_API_URL} = process.env;

  const [messages, setMessages] = useState<(ChatContent | ChatDateLine)[]>([]);
  const [newMessage, setNewMessage] = useState<ChatContent | null>(null);
  const [isEntry, setIsEntry] = useState<boolean>(false);

  const { familyId, familyName } = useFamilyStore();
  const chatRef = firebase.database().ref(`chat/${familyId}/messages`);

  const WS_URL: string = `${REACT_APP_API_URL}/chat`
  const ws = new SockJS(`${WS_URL}?Token=${localStorage.getItem('accessToken')}`);

  const MAX_RETRY_COUNT: number = 5;
  const retryCount = useRef<number>(0);

  useEffect(() => {
    // 소켓 연결
    connect();

    // 채팅 데이터 조회 및 채팅 추가 이벤트 수신
    // 처음에 모든 리스트가 동기화되며 그 후에는 새로 추가된 부분만 동기화
    chatRef.on(
      "value",
        snap => handleAddChatData(snap)
    );

    // 채팅 데이터 변경 이벤트 수신
    chatRef.on(
      "child_changed",
      snap => handleUpdateChatData(snap)
    );

    return () => {
      // 언마운트 시 소켓 연결 해제
      disconnect();
    };
  }, []);

  // 소켓 연결
  const connect = () => {
    ws.onopen = () => {
      console.log("<<< CONNECT");
    }
  }
  // 언마운트 시 소켓 연결 해제
  const disconnect = () => {
    ws.onclose = () => {
      console.log(">>> DISCONNECT");
    };
  }

  const send = () => {
    ws.send(JSON.stringify({
      "messageType": "MESSAGE",
      "content": "방구 먹어라",
      "currentTime": "2024-05-10 17:10:00"
    }))
  }

  // 채팅 내역 조회/추가 이벤트 수신 핸들러
  const handleAddChatData = (snapshot: any) => {
    // 채팅방에 들어와 있는 상태에서 새로운 메시지가 추가될 경우
    if (isEntry) {
      const newMessages: (ChatContent | ChatDateLine)[] = [snapshot[-1].child().val(), ...messages];
      setMessages(newMessages);
    }
    // 새롭게 입장한 경우
    else {

      snapshot.forEach((message: any) => {
        messages.unshift(message.val());

        console.log(message.val().unReadMember)
      })

      // 입장 상태 변경
      setIsEntry(true);
    }

    console.log(messages);
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
    const prevChat = index < ChatSample.length - 1 ? ChatSample[index + 1] : null;

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
      <div className="chat__main">
        {renderChatBubble}
      </div>

      <div onClick={() => send()}>
        전송 테스트
      </div>

      <ChatInput />
    </div>
  );
}

export default ChatIndex;