import React from 'react';
import { NavLink } from "react-router-dom";
import {ReactComponent as HomeIcon } from "@assets/images/icons/ic_home.svg"
import { PiGraduationCap } from "react-icons/pi";
import { PiCalendar } from "react-icons/pi";
import { PiChatCenteredDots } from "react-icons/pi";
import { PiImage } from "react-icons/pi";
// import NotificationBadge from "@components/NotificationBadge";


const BottomBar = () => {
  return (
    <div className="bottom-bar">
      {/*모의고사*/}
      <NavLink to="/exam" className={({isActive}) =>
        isActive ? 'bottom-bar__item--active' : 'bottom-bar__item'
      }>
        <PiGraduationCap size={25}/>
        <span>모의고사</span>
      </NavLink>

      {/*채팅*/}
      <NavLink to="/chat" className={({isActive}) =>
        isActive ? 'bottom-bar__item--active' : 'bottom-bar__item'
      }>
        <PiChatCenteredDots size={25}/>
        <span>채팅</span>
        {/*<NotificationBadge />*/}
      </NavLink>

      {/*홈*/}
      <NavLink to="/main" className={({isActive}) =>
        isActive ? 'bottom-bar__item-home--active' : 'bottom-bar__item-home'
      }>
        <HomeIcon/>
        <span>홈</span>
      </NavLink>

      {/*일정*/}
      <NavLink to="/schedule" className={({isActive}) =>
        isActive ? 'bottom-bar__item--active' : 'bottom-bar__item'
      }>
        <PiCalendar size={25}/>
        <span>일정</span>
      </NavLink>

        {/*앨범*/}
        <NavLink to="/photo" className={({isActive}) =>
          isActive ? 'bottom-bar__item--active' : 'bottom-bar__item'
        }>
          <PiImage size={25}/>
          <span>앨범</span>
        </NavLink>
      </div>

  )
}

export default BottomBar;