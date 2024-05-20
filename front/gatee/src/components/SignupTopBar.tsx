import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { PiCaretLeft } from "react-icons/pi";

const SignupTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const hideBackButton: boolean = [
    '/',
    '/auth',
    '/kakao',
    '/signup',
    '/signup/permission',
    '/signup/family-join',
    '/signup/family-join/check',
    '/signup/family-set/check',
    '/signup/member-set/check',
    '/signup/member-set/share',
    '/signup/member-set/finish',
  ].includes(location.pathname) || location.pathname.startsWith('/auth');

  // 바로 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  }

  return (
    <div
      className="top-bar"
      style={location.pathname === '/signup' ? {
        backgroundColor: '#FFBE5C',
        border: "1px solid #FFBE5C",
      } : {

      }}
    >
      {/* 뒤로 가기 버튼 */}
      <div className="top-bar__left">
        {!hideBackButton && (
          <PiCaretLeft size={24} onClick={goBack} />
        )}
      </div>
    </div>
  )
}

export default SignupTopBar;
