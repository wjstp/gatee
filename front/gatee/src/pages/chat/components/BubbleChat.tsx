import React, {useState} from "react";
import { ChatMessage, SenderType, ChatContent } from "@type/index";
import { MemberInfoSample } from "@constants/index";
import getUserInfo from "@utils/getUserInfo";
import convertToAMPMTime from "@utils/convertToAMPMTime";
import renderBubbleComponent from "@utils/renderBubbleComponent";

interface ChatMessageProps {
 chat: ChatContent;
  isPrevSender: boolean;
}

interface MyChatMessageProps {
  chat: ChatMessage;
  unreadMemberCount: number;
}

interface YourChatMessageProps {
  chat: ChatMessage;
  isPrevSender: boolean;
  unreadMemberCount: number;
}

const YoursChat = (props: YourChatMessageProps) => {
  const { chat, isPrevSender, unreadMemberCount } = props;
  const senderInfo = getUserInfo(chat.sender);

  return (
    <div className="chat__yours-chat">
      {/*프로필*/}
      <div className="chat__yours-chat__profile">
        {!isPrevSender && (
          <img src={senderInfo.image} alt={senderInfo.nickname}/>
        )}
      </div>

      <div className="chat__yours-chat__container">
        {/*닉네임*/}
        {!isPrevSender && (
          <div className="chat__yours-chat__nickname">{ senderInfo.nickname }</div>
        )}

        {/*내용*/}
        {renderBubbleComponent(chat)}
      </div>

      <div className="chat__time-count-wrapper">
        {/*리딩 카운트*/}
        <div className="chat__count">
        {unreadMemberCount > 0 && (
          <span>{unreadMemberCount}</span>
        )}
        </div>

        {/*시간*/}
        <div className="chat__time">
          { convertToAMPMTime(chat.time) }
        </div>
      </div>
    </div>
  );
};

const MyChat = (props: MyChatMessageProps) => {
  const { chat, unreadMemberCount } = props;

  return (
    <div className="chat__my-chat">
      <div className="chat__time-count-wrapper">
        {/*리딩 카운트*/}
        <div className="chat__count--right">
          {unreadMemberCount > 0 && (
            <span>{unreadMemberCount}</span>
          )}
        </div>

        {/*시간*/}
        <div className="chat__time">
          {convertToAMPMTime(chat.time)}
        </div>
      </div>

      {/*내용*/}
      {renderBubbleComponent(chat)}
    </div>
  );
};

const BubbleChat = (props: ChatMessageProps) => {
  const { chat, isPrevSender } = props;
  const myEmail: string = MemberInfoSample.email;
  const [unreadMemberCount, setUnreadMemberCount] = useState<number>(chat.unreadMember.length);

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === myEmail ? "my" : "yours";
  };

  switch (getSenderType(chat.sender)) {
    case SenderType.YOURS:
      return <YoursChat chat={chat as ChatMessage} isPrevSender={isPrevSender} unreadMemberCount={unreadMemberCount}/>;
    case SenderType.MY:
      return <MyChat chat={chat as ChatMessage} unreadMemberCount={unreadMemberCount} />;
    default:
      return null;
  }
};

export default BubbleChat;