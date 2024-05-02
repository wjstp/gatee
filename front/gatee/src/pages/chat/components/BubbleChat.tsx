import React from "react";
import { ChatItem, SenderType, BubbleProps } from "../../../types";
import getUserInfoByEmail from "../../../helpers/getUserInfoByEmail";
import convertToAMPMTime from "../../../helpers/convertToAMPMTime";

const YoursChat: React.FC<{ chat: ChatItem }> = ({ chat }) => {
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
        <div className="chat__yours-chat__content">
          { chat.message }

          {/*파일*/}
          <div className="chat__file">

          </div>
        </div>
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

const MyChat: React.FC<{ chat: ChatItem }> = ({chat }) => {
  return (
    <div className="chat__my-chat">
      <div className="chat__time-count-wrapper">
        {/*리딩 카운트*/}
        <div className="chat__count">
          {chat.readingCount}
        </div>

        {/*시간*/}
        <div className="chat__time">
          {convertToAMPMTime(chat.createdAt)}
        </div>
      </div>

      {/*내용*/}
      <div className="chat__my-chat__content">
        {chat.message}

        {/*파일*/}
        <div className="chat__file">

        </div>
      </div>
    </div>
  );
};

const BubbleChat: React.FC<BubbleProps> = ({chat, senderType}) => {
  switch (senderType) {
    case SenderType.YOURS:
      return <YoursChat chat={chat}/>;
    case SenderType.MY:
      return <MyChat chat={chat}/>;
    default:
      return null;
  }
};

export default BubbleChat;
