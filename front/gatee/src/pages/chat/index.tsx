import React from 'react';
import ChatDate from "@pages/chat/components/ChatDate";
import BubbleChat from "@pages/chat/components/BubbleChat";
import ChatInput from "@pages/chat/components/ChatInput";
import { ChatSample } from "@constants/index";
import { ChatItem } from "@type/index"


const ChatIndex = () => {
  // 메시지 컴포넌트 반환
  const renderBubbleComponent = (chat: ChatItem)  => {
    return <BubbleChat key={chat.chatId} chat={chat} />;
  }

  return (
    <div className="chat">
      {/*채팅 내용*/}
      {ChatSample.chatList.map((chat: ChatItem) => renderBubbleComponent(chat))}
      <ChatDate date={"2024-05-02"}/>

      {/*입력창*/}
      <ChatInput />
    </div>
  );
}

export default ChatIndex;