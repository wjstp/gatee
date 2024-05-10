import React, { useEffect, useRef, useState } from 'react';
import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import ChatDate from "@pages/chat/components/ChatDate";
import { ChatSample } from "@constants/index";
import { ChatContent, ChatDateLine, ChatType } from "@type/index";

import SockJS from "sockjs-client";
import firebase from "../../config";
import 'firebase/auth';
import 'firebase/database';

const ChatIndex = () => {
  const [messages, setMessages] = useState<(ChatContent | ChatDateLine)[]>([]);
  const [newMessage, setNewMessage] = useState<ChatContent | null>(null);
  const { REACT_APP_API_URL, VALID_KEY } = process.env;

  const [data, setData] = useState<any>([]);
  const familyId = "1";
  const chatRef = firebase.database().ref(`chat/${familyId}`)
  const firestore = firebase.database();

  const WS_URL: string = `${REACT_APP_API_URL}/chat`
  const ws = new SockJS(`${WS_URL}?Token=${localStorage.getItem('accessToken')}`);

  const MAX_RETRY_COUNT: number = 5;
  const retryCount = useRef<number>(0);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);

  const connect = () => {
     ws.onopen = () => {
      console.log("<<< CONNECT");
    };
  }

  const disconnect = () => {
    ws.onclose = () => {
      console.log(">>> DISCONNECT");
    };
  }

  const getData = () => {

  }
  // useEffect(() => {
  //   userRef.on('value', snapshot => {
  //     const users = snapshot.val();
  //     console.log(users)
  //     const usersData = [];
  //   })
  // }, []);

  // 이전 채팅과 현재 채팅의 보낸 사람이 같은지 여부에 따라 props 설정
  const setPrevProps = (prevChat: ChatContent, currentChat: ChatContent) => {
    if (prevChat) {
      return { isPrevSender: prevChat.sender === currentChat.sender };
    }
    return { isPrevSender: false };
  };

  // 채팅 버블 렌더링
  const renderChatBubble = ChatSample.map((chat: ChatContent | ChatDateLine, index: number) => {
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
      <ChatInput />
    </div>
  );
}

export default ChatIndex;