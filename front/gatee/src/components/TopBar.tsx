import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { PiCaretLeft } from "react-icons/pi";
import { PiBell } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { PiTarget } from "react-icons/pi";
import { useMemberStore } from "@store/useMemberStore";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { myInfo } = useMemberStore();

  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setCurrentPage(location.pathname)
  }, [location])

  // 바로 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div className="top-bar">
      <div className="top-bar__left" onClick={goBack}>
        <PiCaretLeft size={24}/>
      </div>

      <div className="top-bar__right">
        {/*미션*/}
        <NavLink to="main/mission" className={({isActive}) =>
          isActive ? 'top-bar__right--active' : ''
        }>
          <PiTarget size={24}/>
          {/*<NotificationBadge />*/}
        </NavLink>
        
        {/*알림*/}
        <NavLink to="/notification" className={({isActive}) =>
          isActive ? 'top-bar__right--active' : ''
        }>
          <PiBell size={24}/>
        </NavLink>

        {/*프로필*/}
        <NavLink
          to={`/profile/${myInfo.email}`}
          className={({isActive}) =>
          isActive ? 'top-bar__right--active' : ''
        }>
          <PiUserCircle size={24}/>
        </NavLink>
      </div>
    </div>
  )
}

export default TopBar;
