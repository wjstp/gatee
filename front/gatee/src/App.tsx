import React, {useEffect} from 'react';
import Router from "./Router";
import firebase from "./firebase-config";
import {useLocation} from "react-router-dom";
import {requestPermission} from "./firebase-messaging-sw";
import {useNotificationStore} from "@store/useNotificationStore";

const App = () => {
  const {notificationPopUp, setNotificationPopUp, setShowNotification} = useNotificationStore()
  const location = useLocation();
  // 파이어 베이스 관련 코드
  let messaging;

  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
  // 권한 묻기
  requestPermission()
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
      // 채팅 페이지가 아니고 채팅알림이 아니고, 알림 페이지가 아니면
      if (location.pathname.includes("chatting") && notificationPopUp.title === "채팅 알림" || location.pathname==="/notification") {
      } else{
        setShowNotification(true)
      }
    }
  }, [notificationPopUp]);

  return (
    <Router/>
  );
}

export default App;
