import React from 'react';
import { photoGroup } from "@constants/index";
import PhotoList from "@components/PhotoList";
import {applyAppointmentParticipationApi, getChatFileApi} from "@api/chat";
import { useFamilyStore } from "@store/useFamilyStore";

const ChatPhoto = () => {
  const { chatroomId } = useFamilyStore();

  const getChatFile = () => {
    if (chatroomId) {
      getChatFileApi(
        chatroomId,
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      ).then().catch()
    }
  }

  return (
    <div className="chat-photo">
      {/*사진 리스트*/}
      <PhotoList editMode="normal" photoGroup={photoGroup} handleChecked={null} />
    </div>
  )
}

export default ChatPhoto;