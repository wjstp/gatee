import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { PiCaretLeft } from "react-icons/pi";
import { PiBell } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { PiTarget } from "react-icons/pi";
import { useMemberStore } from "@store/useMemberStore";
import NotificationBadge from "@components/NotificationBadge";
import {useNotificationStore} from "@store/useNotificationStore";

const TopBar = () => {
  const navigate = useNavigate();
  const { myInfo } = useMemberStore();
  const {showNotification} = useNotificationStore()
  const [currentRoute, setCurrentRoute] = useState('');
  const location = useLocation();

  useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location])

  const hideBackButton: boolean = ['/main', '/chatting', '/schedule', '/exam', '/photo/album', '/photo/day', '/photo/month', '/photo/year'].includes(currentRoute);

  // 바로 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="top-bar">
      {/* 뒤로 가기 버튼 */}
      <div className="top-bar__left">
        {!hideBackButton && (
          <PiCaretLeft size={24} onClick={goBack} />
        )}
      </div>

      <div className="top-bar__right">
        {/* 미션 */}
        <NavLink to="/mission" className={({ isActive }) =>
          isActive ? 'top-bar__right--active' : ''
        }>
          <PiTarget size={24} />
        </NavLink>

        {/* 알림 */}
        <NavLink to="/notification" className={({isActive}) =>
          isActive ? 'top-bar__right--active position-relative' : 'position-relative'
        }>
          <PiBell size={24} />
          { showNotification && currentRoute !== "/notification" && <NotificationBadge />}
        </NavLink>

        {/* 프로필 */}
        <NavLink
          to={`/profile/${myInfo.email}`}
          className={({ isActive }) =>
            isActive ? 'top-bar__right--active' : ''
          }>
          <PiUserCircle size={24} />
        </NavLink>
      </div>
    </div>
  )
}

export default TopBar;
