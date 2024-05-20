import React from 'react';
import { ChatAlarm, ChatAppointment, ChatEmoji, ChatFile, ChatMessage, ChatType } from "@type/index";
import BubbleChatMessage from "@pages/chat/components/BubbleChatMessage";
import BubbleChatFile from "@pages/chat/components/BubbleChatFile";
import BubbleChatAppointment from "@pages/chat/components/BubbleChatAppointment";
import BubbleChatAlarm from "@pages/chat/components/BubbleChatAlarm";

// type에 따라 다른 컴포넌트를 반환하는 함수
const renderBubbleComponent = (chat: ChatMessage | ChatFile | ChatAppointment)  => {
  switch (chat.messageType) {
    case ChatType.MESSAGE:
      return <BubbleChatMessage chat={chat as ChatMessage} />;
    case ChatType.FILE:
      return <BubbleChatFile chat={chat as ChatFile} />;
    case ChatType.APPOINTMENT:
      return <BubbleChatAppointment chat={chat as ChatAppointment} />;
    case ChatType.EMOJI:
      return <BubbleChatMessage chat={chat as ChatEmoji} />;
    case ChatType.ALARM:
      return <BubbleChatAlarm chat={chat as ChatAlarm} />;
    default:
      return null;
  }
};

export default renderBubbleComponent;