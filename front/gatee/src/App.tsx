import React, {useEffect} from 'react';
import Router from "./Router";
import firebase from "./firebase-config";
import {useLocation} from "react-router-dom";
import {useNotificationStore} from "@store/useNotificationStore";

const App = () => {
  const {notificationPopUp, setNotificationPopUp, setShowNotification} = useNotificationStore()
  const location = useLocation();
  // 파이어 베이스 관련 코드
  let messaging;

  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }

  
  let url = "/main"

  // 메세지 받기
  if (firebase.messaging.isSupported() && messaging !== undefined)
    messaging.onMessage((payload) => {
      console.log(payload.notification)
      const notificationData = payload.notification
      const notificationTitle = payload.notification.title;
      if (notificationTitle.includes("채팅")) {
        url = "/chatting"
      } else if (notificationTitle.includes("사진")) {
        url = "/photo/day"
      } else if (notificationTitle.includes("한마디")) {
        url = "/notification"
      }

      setNotificationPopUp({
        title: notificationTitle,
        body: notificationData.body,
        icon: notificationData.icon,
        url: url,
      })
    });

  useEffect(() => {
    if (notificationPopUp !== null) {
      // 채팅이 아니고, 알림페이지 아닐때만 알림 팝업 울리기
      if (notificationPopUp.title.includes("채팅")) {
      }
      else if(location.pathname !== "/notification") {
        setShowNotification(true)
      }
    }
  }, [notificationPopUp]);

  return (
    <Router/>
  );
}

export default App;
