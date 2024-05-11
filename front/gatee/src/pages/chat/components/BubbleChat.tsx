import React, {useState} from "react";
import {ChatMessage, SenderType, ChatContent, MemberApiReq} from "@type/index";
import getUserInfo from "@utils/getUserInfo";
import convertKrTime from "@utils/convertKrTime";
import renderBubbleComponent from "@utils/renderBubbleComponent";
import { useFamilyStore } from "@store/useFamilyStore";
import { useMemberStore } from "@store/useMemberStore";

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
  const { familyInfo } = useFamilyStore();
  const { myInfo } = useMemberStore();
  const senderInfo: null | MemberApiReq = getUserInfo(familyInfo, chat.sender);

  return (
    <div className="chat__yours-chat">
      {/*프로필*/}
      <div className="chat__yours-chat__profile">
        {!isPrevSender && (
          <img src={senderInfo?.fileUrl} alt={senderInfo?.nickname}/>
        )}
      </div>

      <div className="chat__yours-chat__container">
        {/*닉네임*/}
        {!isPrevSender && (
          <div className="chat__yours-chat__nickname">{ senderInfo?.nickname }</div>
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
          { convertKrTime(chat.currentTime) }
        </div>
      </div>
    </div>
  );
};

const MyChat = (props: MyChatMessageProps) => {
  const { chat, unreadMemberCount } = props;
  const { familyInfo } = useFamilyStore();
  const { myInfo } = useMemberStore();

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
          {convertKrTime(chat.currentTime)}
        </div>
      </div>

      {/*내용*/}
      {renderBubbleComponent(chat)}
    </div>
  );
};

const BubbleChat = (props: ChatMessageProps) => {
  const { chat, isPrevSender } = props;
  const { myInfo } = useMemberStore();
  const [unreadMemberCount, setUnreadMemberCount] = useState<number>(chat.unReadMember.length);

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === myInfo.memberId ? "my" : "yours";
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