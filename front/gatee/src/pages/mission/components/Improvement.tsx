import React from 'react';
import HeartIcon from "@assets/images/icon3D/heart.png"
import BookIcon from "@assets/images/icon3D/book.png"
import GoalIcon from "@assets/images/icon3D/goal.png"
import SmileIcon from "@assets/images/icon3D/smile.png"


const Improvement = ({type}: any) => {

  // console.log(type)
  // const type = "hello"
  const content:any = {
    heart: {
      content: ["사랑해라는 말한마디", "보내는 것은 어떨까요?"],
      destination: "/main",
      buttonComment: "한마디 보내기",
      icon: HeartIcon
    },
    about: {
      content: ["나의 이야기를", "전해볼까요?"],
      destination: "/character/start",
      buttonComment: "백과사전 작성하기",
      icon: BookIcon
    },
    hello: {
      content: ["가벼운 인사 한마디", "건네봐요"],
      destination: "/chatting",
      buttonComment: "채팅하기",
      icon: GoalIcon
    },
    calendar: {
      content: ["함께 일정을", "잡아보아요"],
      destination: "/calendar",
      buttonComment: "일정 잡기",
      icon: SmileIcon
    }
  }
  return (
    <div className="improvement-card">
      <div>
        <div>{content[type].content[0]}</div>
        <div>{content[type].content[1]}</div>
        <div className="flex-row">
          <button className="improvement-card-button">{content[type].buttonComment}</button>
          <img className="imgWidth" src={content[type].icon} alt="개선방안"/>
        </div>
      </div>
    </div>
  );
};

export default Improvement;