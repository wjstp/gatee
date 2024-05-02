import React from "react";
import { ChatItem, SenderType, BubbleProps } from "../../../types";


const YoursPlan: React.FC<{ chat: ChatItem }> = ({ chat }) => {
  return <div>YoursPlan</div>;
};

const MyPlan: React.FC<{ chat: ChatItem }> = ({ chat }) => {
  return <div>MyPlan</div>;
};

const BubblePlan: React.FC<BubbleProps> = ({ chat, senderType }) => {
  switch (senderType) {
    case SenderType.YOURS:
      return <YoursPlan chat={chat} />;
    case SenderType.MY:
      return <MyPlan chat={chat} />;
    default:
      return null;
  }
};

export default BubblePlan;