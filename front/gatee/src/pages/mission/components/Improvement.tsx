import React from 'react';
import HeartIcon from "@assets/images/icon3D/heart.png"
import BookIcon from "@assets/images/icon3D/book.png"
// import GoalIcon from "@assets/images/icon3D/goal.png"
import SmileIcon from "@assets/images/icon3D/smile.png"
import CalendarIcon from "@assets/images/icon3D/calendar-improvement.png"
import PencilIcon from "@assets/images/icon3D/pencil-improvement.png"
import CameraIcon from "@assets/images/icon3D/camera-improvement.png"
import {useNavigate} from "react-router-dom";
// import {useFamilyStore} from "@store/useFamilyStore";
// import {useMemberStore} from "@store/useMemberStore";
// import getRandomFamilyName from "@utils/getRandomFamilyName";


const Improvement = ({type}: any) => {
  const navigate = useNavigate();
  // const {familyInfo} = useFamilyStore()
  // const {myInfo} = useMemberStore()
  // const randomFamily = getRandomFamilyName(familyInfo,myInfo.nickname)
  // console.log(type)
  // const type = "hello"
  const content:any = {
    heart: {
      content: [`사랑해라는 한마디`, "보내는 것은 어떨까요?"],
      destination: "/main",
      buttonComment: "한마디 보내기",
      icon: HeartIcon
    },
    hello: {
      content: ["가벼운 인사 한마디", "건네봐요"],
      destination: "/chatting",
      buttonComment: "채팅하기",
      icon: SmileIcon
    },
    albumMission: {
      content: ["함께 사진을 찍어", "공유해요"],
      destination: "/photo",
      buttonComment: "사진 올리기",
      icon: CameraIcon
    },
    featureMission: {
      content: ["나의 이야기를", "전해볼까요?"],
      destination: "/character/start",
      buttonComment: "백과사전 쓰기",
      icon: BookIcon
    },
    examMission :{
      content: ["가족 탐구 모의고사", "풀어보아요"],
      destination: "/exam",
      buttonComment: "모의고사 풀기",
      icon: PencilIcon
    },
    scheduleMission: {
      content: ["함께 일정을", "잡아보아요"],
      destination: "/schedule",
      buttonComment: "일정 잡기",
      icon: CalendarIcon
    }
  }
  return (
    <div className="improvement-card">
      <div>
        <div>{content[type].content[0]}</div>
        <div>{content[type].content[1]}</div>
        <div className="flex-row">
          <button onClick={()=>navigate(content[type].destination)} className="improvement-card-button">{content[type].buttonComment}</button>
          <img className="imgWidth" src={content[type].icon} alt="개선방안"/>
        </div>
      </div>
    </div>
  );
};

export default Improvement;