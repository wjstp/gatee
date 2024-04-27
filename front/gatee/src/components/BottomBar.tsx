import React from 'react';
import { NavLink } from "react-router-dom";
import {ReactComponent as HomeIcon } from "@assets/image/icons/home.svg"
import { PiGraduationCap } from "react-icons/pi";
import { PiCalendar } from "react-icons/pi";
import { PiChatCenteredDots } from "react-icons/pi";
import { PiImage } from "react-icons/pi";
// import NotificationBadge from "@components/NotificationBadge";


const BottomBar = () => {
  return (
    <div>
      <div className="bottomBar">
        {/*모의고사*/}
        <NavLink to="/exam" className={({isActive}) =>
          isActive ? 'bottomBar__item--active' : 'bottomBar__item'
        }>
          <PiGraduationCap size={24}/>
          <span>모의고사</span>
        </NavLink>

        {/*채팅*/}
        <NavLink to="/chat" className={({isActive}) =>
          isActive ? 'bottomBar__item--active' : 'bottomBar__item'
        }>
          <PiChatCenteredDots size={24}/>
          <span>채팅</span>
          {/*<NotificationBadge />*/}
        </NavLink>

        {/*홈*/}
        <NavLink to="/main" className={({isActive}) =>
          isActive ? 'bottomBar__itemHome--active' : 'bottomBar__itemHome'
        }>
          <HomeIcon/>
          <span>홈</span>
        </NavLink>

        {/*일정*/}
        <NavLink to="/schedule" className={({isActive}) =>
          isActive ? 'bottomBar__item--active' : 'bottomBar__item'
        }>
          <PiCalendar size={24}/>
          <span>일정</span>
        </NavLink>

        {/*앨범*/}
        <NavLink to="/photo" className={({isActive}) =>
          isActive ? 'bottomBar__item--active' : 'bottomBar__item'
        }>
          <PiImage size={24}/>
          <span>앨범</span>
        </NavLink>
      </div>
    </div>
  )
}

export default BottomBar;