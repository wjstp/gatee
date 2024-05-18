import React, {useEffect, useState} from 'react';
import PhotoList from "@components/PhotoList";
import { applyAppointmentParticipationApi, getChatFileApi } from "@api/chat";
import { useFamilyStore } from "@store/useFamilyStore";
import { FileRes } from "@type/index";

const ChatPhoto = () => {
  const { chatRoomId } = useFamilyStore();
  const [files, setFiles] = useState<FileRes[]>([]);

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

  return (
    <div className="chat-photo">
      { files.length === 0 && (
        <div className="chat-photo__no-photo">
         사진이 없습니다
        </div>
      )}
      {files && files.map((file: FileRes, index: number) => (
        <div key={index} className="chat-photo__item">
          <img src={file.imageUrl} alt={`Photo ${index + 1}`} className="chat-photo__image"/>
        </div>
      ))}
    </div>
  )
}

export default ChatPhoto;