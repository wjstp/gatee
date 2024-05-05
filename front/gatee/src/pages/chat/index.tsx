import React, { useEffect, useRef, useState } from 'react';
import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import { ChatSample } from "@constants/index";
import { ChatMessage } from "@type/index"
import { entryChatRoomApi } from "@api/Chat";

import { CompatClient } from "@stomp/stompjs";
import SockJS from "sockjs-client";


const ChatIndex = () => {
  const REACT_APP_API_URL: string | undefined = process.env.REACT_APP_API_URL
  const client = useRef<CompatClient | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // 채팅방 진입 시 이전 채팅 불러오기
  const loadChatHistory = () => {
    entryChatRoomApi(
      ({data}: any) => setMessages(data),
      (error: any) => {
        console.log(error);
      }
    ).then(() => {
      //
    });
  };

  // 소켓 연결
  const connectHandler = () => {
    // SockJs 클라이언트 객체 셍성
    const socket = new SockJS(`${REACT_APP_API_URL}/ws`);
  }

  useEffect(() => {
    // loadChatHistory();
    connectHandler();
  }, []);

  return (
    <div className="chat">
      {ChatSample.chatList.map((chat: ChatMessage) =>
        <BubbleChat key={chat.chatId} chat={chat} />
      )}
      <ChatInput />
    </div>
  );
}

export default ChatIndex;