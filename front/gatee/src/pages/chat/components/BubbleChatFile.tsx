import React from 'react';
import {useNavigate} from "react-router-dom";
import { ChatFile } from "@type/index";
import {useChatStore} from "@store/useChatStore";


interface ChatFileProps {
  chat: ChatFile;
}

const BubbleChatFile = (props: ChatFileProps) => {
  const { chat } = props;
  const navigate = useNavigate();
  const {setPhotoDetailUrl} = useChatStore();

  const handleFileClick = (file: string) => {
    setPhotoDetailUrl(file);
    navigate("/chatting/photo/detail");
  };

  return (
    <div className={`bubble-file${chat.files && chat.files.length >= 2 ? '--multiple' : '--single'}`}>
      {chat.files && chat.files.map((file: string, index: number) => (
        <div className="bubble-file__item" key={index} onClick={() => handleFileClick(file)}>
          <img src={file} alt={`chat_image_${index}`} />
        </div>
      ))}
    </div>
  );
};

export default BubbleChatFile;
