import React from 'react';
import { ChatEmoji, ChatMessage } from "@type/index";
import { MemberInfoSample, EMOJI } from "@constants/index";

interface ChatMessageProps {
  chat: ChatMessage | ChatEmoji;
}
const BubbleChatMessage = (props: ChatMessageProps) => {
  const { chat } = props;

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === MemberInfoSample.email ? "my" : "yours";
  };

  // 이모티콘 반환 함수
  const getEmoji = (value: string) => {
    const emojiItem = EMOJI.flatMap(emoji => emoji.item).find(item => item.id === value);
    return emojiItem ? emojiItem.image : undefined;
  }

  return (
    <div className={`bubble-chat__${ getSenderType(chat.sender) }`}>
      { "emojiId" in chat && (
       <div className="bubble-chat__emoji">
         <img src={getEmoji(chat.emojiId)} alt="chat.emojiId"/>
       </div>
      )}
      { chat.content }
    </div>
);
};

export default BubbleChatMessage;