import React, {useEffect, useState} from 'react';
import PhotoList from "@components/PhotoList";
import { applyAppointmentParticipationApi, getChatFileApi } from "@api/chat";
import { useFamilyStore } from "@store/useFamilyStore";
import { FileRes } from "@type/index";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@store/useChatStore";

const ChatPhoto = () => {
  const { chatRoomId } = useFamilyStore();
  const navigate = useNavigate();
  const { setPhotoDetailUrl, files, setFiles } = useChatStore();

  useEffect(() => {
    if (chatRoomId) {
      getChatFile();
    }
  }, [chatRoomId]);

  const getChatFile = () => {
    if (chatRoomId) {
      getChatFileApi(
        chatRoomId,
        (res) => {
          setFiles(res.data);
        },
        (err) => {
          console.log(err);
        }
      ).then().catch()
    }
  }

  const handleFileClick = (file: string) => {
    setPhotoDetailUrl(file);
    navigate("/chatting/photo/detail");
  };

  return (
    <div className="chat-photo">
      { files.length === 0 && (
        <div className="chat-photo__no-photo">
         사진이 없습니다
        </div>
      )}
      {files && files.map((file: FileRes, index: number) => (
        <div key={index} className="chat-photo__item" onClick={() => handleFileClick(file.imageUrl)}>
          <img src={file.imageUrl} alt={`Photo ${index + 1}`} className="chat-photo__image"/>
        </div>
      ))}
    </div>
  )
}

export default ChatPhoto;