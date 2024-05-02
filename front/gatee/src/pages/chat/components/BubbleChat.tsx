import React from "react";
import { ChatItem, SenderType, BubbleProps } from "../../../types";

const YoursChat: React.FC<{ chat: ChatItem }> = ({ chat }) => {
  return <div>YoursChat</div>;
};

const MyChat: React.FC<{ chat: ChatItem }> = ({ chat }) => {
  return <div>MyChat</div>;
};

const BubbleChat: React.FC<BubbleProps> = ({ chat, senderType }) => {
  switch (senderType) {
    case SenderType.YOURS:
      return <YoursChat chat={chat} />;
    case SenderType.MY:
      return <MyChat chat={chat} />;
    default:
      return null;
  }
};

export default BubbleChat;
