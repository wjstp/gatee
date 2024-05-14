import React, {useEffect} from 'react';
import Router from "./Router";
import firebase from "./firebase-config";
import {useModalStore} from "@store/useModalStore";
import {useLocation} from "react-router-dom";

const App = () => {
  const {notificationPopUp, setNotificationPopUp, setShowNotification} = useModalStore()
  const location = useLocation();
  let messaging;

  if (firebase.messaging.isSupported()) {
    messaging = firebase.messaging();
  }
  let url = "/main"

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
      // 채팅 페이지가 아니고 채팅알림이 아니면 울림
      if (location.pathname.includes("chatting") && notificationPopUp.title === "채팅 알림") {
      } else {
        setShowNotification(true)
      }
    }
  }, [notificationPopUp]);

  return (
    <Router/>
  );
}

export default App;
