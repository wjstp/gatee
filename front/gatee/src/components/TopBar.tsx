import React, { useEffect, useState } from 'react';
import { useNavigate, NavLink, useLocation } from "react-router-dom";
import { PiCaretLeft } from "react-icons/pi";
import { PiBell } from "react-icons/pi";
import { PiUserCircle } from "react-icons/pi";
import { PiSquaresFour } from "react-icons/pi";
import { PiGearSix } from "react-icons/pi";

const TopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState('');

  useEffect(() => {
    setCurrentPage(location.pathname)
  }, [location])

  // 바로 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div>
      <div className="topBar">
        <div className="leftDiv" onClick={goBack}>
          <PiCaretLeft size={24}/>
        </div>
        <div className="rightDiv">
          {currentPage === '/notification' && (
            <PiGearSix size={24}/>
          )}
          {currentPage === '/chat' && (
            <PiSquaresFour size={24}/>
          )}
          <NavLink to="/notification" className={({isActive}) =>
            isActive ? 'rightDiv--active' : ''
          }>
            <PiBell size={24}/>
          </NavLink>
          <NavLink to="/profile" className={({isActive}) =>
            isActive ? 'rightDiv--active' : ''
          }>
            <PiUserCircle size={24}/>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default TopBar;
