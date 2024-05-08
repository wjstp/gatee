import React from 'react';
import { ChatFile } from "@type/index";

interface ChatFileProps {
  chat: ChatFile;
}

const BubbleChatFile = (props: ChatFileProps) => {
  const { chat } = props;

  return (
    <div className={`bubble-file${chat.files && chat.files.length >= 2 ? '--multiple' : '--single'}`}>
      {chat.files && chat.files.map((file: string, index: number) =>
        <div className="bubble-file__item" key={index}>
          <img src={file} alt={`chat_image_${index}`} />
        </div>
      )}
    </div>
  );
};

export default BubbleChatFile;