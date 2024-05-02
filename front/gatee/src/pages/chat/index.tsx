import React from 'react';
import BubbleDate from "@pages/chat/components/BubbleDate";
import BubbleChat from "@pages/chat/components/BubbleChat";
import BubblePlan from "@pages/chat/components/BubblePlan";
import ChatInput from "@pages/chat/components/ChatInput";
import { ChatSample } from "../../constants";
import { Schedule, ChatItem, SenderType } from "../../types"
import DayScheduleCard from "@pages/schedule/components/DayScheduleCard";

const ChatIndex = () => {
  const myEmail: string = "2yunj007@gmail.com";

  // chat.type에 따라 다른 컴포넌트를 반환하는 함수
  const renderBubbleComponent = (chat: ChatItem): JSX.Element | null => {
    // chat.type에 따라 다른 컴포넌트 렌더링
    switch (chat.type) {
      case "chat":
        return <BubbleChat key={chat.chatId} chat={chat} senderType={getSenderType(chat.sender)} />;
      case "plan":
        return <BubblePlan key={chat.chatId} chat={chat} senderType={getSenderType(chat.sender)} />;
      default:
        return null;
    }
  };

  // senderType 함수
  const getSenderType = (value: string): string => {
    return value === myEmail ? "my" : "yours";
  };

  return (
    <div className="chat">
      {/*채팅 내용*/}
      <div className="chat__main">
        <BubbleDate />
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