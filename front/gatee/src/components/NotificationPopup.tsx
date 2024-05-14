import React from 'react';
import {useModalStore} from "@store/useModalStore";
import {useNavigate} from "react-router-dom";

const NotificationPopUp = () => {
  const {notificationPopUp, setNotificationPopUp, setShowNotification} = useModalStore()
  const navigate = useNavigate();
  return (
    <div>
      {notificationPopUp === null ?
        null :
        <div className="notification-pop-up--container"
             onClick={() => {
               navigate(`${notificationPopUp?.url}`)
               setNotificationPopUp(null)
               setShowNotification(false)
             }}>
          <p className="notification-pop-up--title">{notificationPopUp?.title}</p>
          <p className="notification-pop-up--content">{notificationPopUp?.body}</p>
        </div>
      }
    </div>
  )
}

export default NotificationPopUp;