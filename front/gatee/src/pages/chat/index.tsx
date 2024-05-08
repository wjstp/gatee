import React, { useEffect, useRef, useState } from 'react';
import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import ChatDate from "@pages/chat/components/ChatDate";
import { ChatSample } from "@constants/index";
import { ChatContent, ChatDateLine, ChatType } from "@type/index";
import dayjs from "dayjs";
// import SockJS from "sockjs-client";


const ChatIndex = () => {
  const [messages, setMessages] = useState<(ChatContent | ChatDateLine)[]>([]);
  const [newMessage, setNewMessage] = useState<ChatContent | null>(null);

  useEffect(() => {
    // 컴포넌트 마운트 시 대화 불러오기 & 소켓 연결

    // 컴포넌트 언마운트 시 소켓 연결 해제
    return () => {
      console.log("exit chat")
    };
  }, []);

  useEffect(() => {
    console.log(newMessage);
  }, [newMessage]);


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

    switch (chat.type) {
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