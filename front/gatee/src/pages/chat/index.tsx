import React, { useState } from 'react';
import ChatDate from "@pages/chat/components/ChatDate";
import BubbleChat from "@pages/chat/components/BubbleChat";
import BubblePlan from "@pages/chat/components/BubblePlan";
import ChatInput from "@pages/chat/components/ChatInput";
import { ChatSample } from "../../constants";
import { ChatItem } from "../../types"
import dayjs from "dayjs";


const ChatIndex = () => {
  const myEmail: string = "2yunj007@gmail.com";

  // chat.type에 따라 다른 컴포넌트를 반환하는 함수
  const renderBubbleComponent = (chat: ChatItem)  => {
    switch (chat.type) {
      case "chat":  // 채팅
        return <BubbleChat key={chat.chatId} chat={chat} senderType={getSenderType(chat.sender)} />;
      case "plan":  // 약속
        return <BubblePlan key={chat.chatId} chat={chat} senderType={getSenderType(chat.sender)} />;
      default:
        return null;
    }
  };

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === myEmail ? "my" : "yours";
  };

  return (
    <div className="chat">
      {/*채팅 내용*/}
      <div className="chat__main">
        <ChatDate date={"2024-05-02"}/>
        {ChatSample.chatList.map((chat: ChatItem) => renderBubbleComponent(chat))}
      </div>

      {/*입력창*/}
      <div className="chat__input">
        <ChatInput />
      </div>
    </div>
  );
}

export default ChatIndex;