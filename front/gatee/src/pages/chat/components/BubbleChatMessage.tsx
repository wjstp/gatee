import React from 'react';
import { ChatEmoji, ChatMessage } from "@type/index";
import { EMOJI } from "@constants/index";
import {useMemberStore} from "@store/useMemberStore";

interface ChatMessageProps {
  chat: ChatMessage | ChatEmoji;
}

const BubbleChatMessage = (props: ChatMessageProps) => {
  const { chat } = props;
  const { myInfo } = useMemberStore();

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === myInfo.memberId ? "my" : "yours";
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
         <img src={getEmoji(chat.emojiId)} alt={chat.emojiId}/>
       </div>
      )}
      { chat.content }
    </div>
);
};

export default BubbleChatMessage;