import React from 'react';
import {useChatStore} from "@store/useChatStore";

const ChatPhotoDetail = () => {
  const {photoDetailUrl} = useChatStore();

  return (
    <div className="chat-photo-detail">
      <img src={photoDetailUrl} alt=""/>
    </div>
  );
};

export default ChatPhotoDetail;