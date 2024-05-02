import React, {useState} from 'react';
import {Outlet} from "react-router-dom";

interface NotificationItemProps {
  type: string,
  content: string,
}

const NotificationIndex = () => {
  const notificationDataList = [
    {type: "앨범", content: "내용", date: "2024-05"},
    {type: "한마디", content: "내용", date: "2024-05"},
    {type: "일정", content: "내용", date: "2024-05"},
    {type: "깜짝 퀴즈", content: "내용", date: "2024-05"},
    {type: "기념일", content: "내용", date: "2024-05"},
  ]
  //  토스트 팝업 상태관리
  return (
    <div className="notification-tab--container">

      {notificationDataList.map((item, index) => {
        return <NotificationItem key={index} notificationData={item}/>
      })}
      <Outlet/>
    </div>
  );
};

const NotificationItem = ({notificationData}: any) => {

  return (
    <div className="notification-item--container">
      <img className="notification-item-profile--img"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHBF8PhK0rOnzOdpAqEH8EI2zcbFeIooAWoRp3WWGP-Q&s"
           alt="다니에루"/>
      <div className="notification-item--content">
        <div className="notification-item--top--container">
          <p>앨범</p>
          <p>4월 17일</p>
        </div>
        <p>다니엘님이 사진을 등록했습니다.</p>
      </div>
    </div>
  )
}
export default NotificationIndex;