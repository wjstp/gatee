import React, { useEffect, useState } from "react";
import { ChatMessage, SenderType, ChatContent, MemberApiReq } from "@type/index";
import getUserInfo from "@utils/getUserInfo";
import convertKrTime from "@utils/convertKrTime";
import renderBubbleComponent from "@utils/renderBubbleComponent";
import { useFamilyStore } from "@store/useFamilyStore";
import { useMemberStore } from "@store/useMemberStore";
import { NavLink } from "react-router-dom";

interface ChatMessageProps {
 chat: ChatContent;
  isPrevSender: boolean;
}

interface MyChatMessageProps {
  chat: ChatMessage;
  unReadMemberCount: number;
}

interface YourChatMessageProps {
  chat: ChatMessage;
  isPrevSender: boolean;
  unReadMemberCount: number;
}

const YoursChat = (props: YourChatMessageProps) => {
  const { chat, isPrevSender, unReadMemberCount } = props;
  const { familyInfo } = useFamilyStore();
  const senderInfo: null | MemberApiReq = getUserInfo(familyInfo, chat.sender);

  return (
    <div className="chat__yours-chat">
      {/*프로필*/}
      <NavLink to={`/profile/${senderInfo?.email}`} className="chat__yours-chat__profile">
        {!isPrevSender && (
          <img src={senderInfo?.profileImageUrl} alt={senderInfo?.nickname}/>
        )}
      </NavLink>

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
        {unReadMemberCount > 0 && (
          <span>{unReadMemberCount}</span>
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
  const { chat, unReadMemberCount } = props;

  return (
    <div className="chat__my-chat">
      <div className="chat__time-count-wrapper">
        {/*리딩 카운트*/}
        <div className="chat__count--right">
          {unReadMemberCount > 0 && (
            <span>{unReadMemberCount}</span>
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
  const [unReadMemberCount, setUnReadMemberCount] = useState<number>(0);

  useEffect(() => {
    if (chat.unReadMember) {
      setUnReadMemberCount(chat.unReadMember.length);
    }
  }, [chat.unReadMember]);

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === myInfo.memberId ? "my" : "yours";
  };

  switch (getSenderType(chat.sender)) {
    case SenderType.YOURS:
      return <YoursChat chat={chat as ChatMessage} isPrevSender={isPrevSender} unReadMemberCount={unReadMemberCount}/>;
    case SenderType.MY:
      return <MyChat chat={chat as ChatMessage} unReadMemberCount={unReadMemberCount} />;
    default:
      return null;
  }
};

export default BubbleChat;