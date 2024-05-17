import React from 'react';
import { ReactComponent as LineLogo } from "@assets/images/logo/logo_line.svg"
import { ReactComponent as KaKao } from "@assets/images/signup/kakao_narrow.svg"
import { useLocation } from "react-router-dom";

const KaKaoLogin = () => {
  const redirectUri: string | undefined = `${process.env.REACT_APP_API_URL}/auth`
  const location = useLocation();
  const taehyeon: string = "http://localhost:3000/auth"

  // 카카오 인가코드 발급
  const loginWithKaKao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: taehyeon,
      scope: "profile_nickname, account_email",
    })
  }

  return (
    <div
      className="onboarding__container-center"
    >

      <div
        className="slider__container"
        style={location.pathname === '/' ? {
          marginTop: "20dvh" } : {
          marginTop: 0
        }}
      >
        {/* 한줄 소개 */}
        <div className="textFlex">
          <h2>가족들과 같이, </h2><h1>가티</h1>
        </div>

        {/* 중간 부분 */}
        <div className="explain">

          {/* 로고 */}
          <LineLogo width={150} height={150}/>
          {/* 로고가 캡쳐화면만큼 크면 안되니까 div 요소 삽입하여 크기 조절 */}
          <div className="emptyBox"></div>

        </div>

        {/* 로그인 버튼 */}
        <button
          className="kakaoLoginButton"
          onClick={loginWithKaKao}
        >
          <KaKao className="kakaoLoginImage "/>
        </button>

      </div>
    </div>
  );
}

export default KaKaoLogin;
