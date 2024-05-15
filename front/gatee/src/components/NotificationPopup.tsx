import React, {useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import logo from "@assets/images/logo/app_icon_orange.svg"
import {useNotificationStore} from "@store/useNotificationStore";
const NotificationPopUp = () => {
  const {notificationPopUp, setNotificationPopUp, setShowNotification} = useNotificationStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (notificationPopUp !== null) {
      // 알림 표시
      setTimeout(() => {
        // fade-out 효과 완료 후 알림 제거
        setNotificationPopUp(null);
        // setShowNotification(false);

      }, 2000); // 2초 후 fade-out 효과 시작
    }
  }, [notificationPopUp]);

  return (
    <div>
      {notificationPopUp === null ? null :
        <div className="notification-pop-up--container"
             onClick={() => {
               navigate(`${notificationPopUp?.url}`);
               setNotificationPopUp(null);
               setShowNotification(false);
             }}>

          <img className="notification-content--img" src={logo} alt=""/>
          <div className="notification-content--container">
            <p className="notification-pop-up--title">{notificationPopUp?.title}</p>
            <p className="notification-pop-up--content">{notificationPopUp?.body}</p>
          </div>
        </div>
      }
    </div>
  );
}

export default NotificationPopUp;
