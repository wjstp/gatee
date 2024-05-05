import React from "react";
import { ChatMessage, ChatFile, SenderType } from "@type/index";
import { MemberInfoSample } from "@constants/index";
import getUserInfoByEmail from "@helpers/getUserInfoByEmail";
import convertToAMPMTime from "@helpers/convertToAMPMTime";
import renderBubbleComponent from "@helpers/renderBubbleComponent";

const YoursChat = ({ chat }: { chat: ChatMessage }) => {
  const senderInfo = getUserInfoByEmail(chat.sender);

  return (
    <div className="chat__yours-chat">
      {/*프로필*/}
      <div className="chat__yours-chat__profile">
        <img src={senderInfo.image} alt={senderInfo.nickname}/>
      </div>

      <div className="chat__yours-chat__container">
        {/*닉네임*/}
        <div className="chat__yours-chat__nickname">{ senderInfo.nickname }</div>

        {/*내용*/}
        {renderBubbleComponent(chat)}
      </div>

      <div className="chat__time-count-wrapper">
        {/*리딩 카운트*/}
        <div className="chat__count">
        { chat.readingCount }
        </div>

        {/*시간*/}
        <div className="chat__time">
          { convertToAMPMTime(chat.createdAt) }
        </div>
      </div>

    </div>
  );
};

const MyChat = ({ chat }: { chat: ChatMessage }) => {
  return (
    <div className="chat__my-chat">
      <div className="chat__time-count-wrapper">
        {/*리딩 카운트*/}
        <div className="chat__count--right">
          {chat.readingCount}
        </div>

        {/*시간*/}
        <div className="chat__time">
          {convertToAMPMTime(chat.createdAt)}
        </div>
      </div>

      {/*내용*/}
      {renderBubbleComponent(chat)}
    </div>
  );
};

const BubbleChat = ({ chat }: { chat: ChatMessage }) => {
  const myEmail: string = MemberInfoSample.email;

  // senderType 반환 함수
  const getSenderType = (value: string): string => {
    return value === myEmail ? "my" : "yours";
  };

  switch (getSenderType(chat.sender)) {
    case SenderType.YOURS:
      return <YoursChat chat={chat}/>;
    case SenderType.MY:
      return <MyChat chat={chat}/>;
    default:
      return null;
  }
};

export default BubbleChat;