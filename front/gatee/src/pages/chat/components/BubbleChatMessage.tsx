import React from 'react';
import { ChatItem } from "@type/index";
import {MemberInfoSample} from "@constants/index";

const BubbleChatMessage :React.FC<{ chat: ChatItem }> = ({chat}) => {
  const myEmail: string = MemberInfoSample.email;

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === myEmail ? "my" : "yours";
  };

  return (
    <div className={`bubble-chat__${getSenderType(chat.sender)}`}>
      { chat.message }
    </div>
  );
};

export default BubbleChatMessage;