import React from 'react';
import {ReactComponent as LineLogo} from "@assets/images/logo/logo_line.svg"
import {Link} from "react-router-dom";

const KaKaoLogin = () => {

  return (
    <div className="onboarding__container-center">

      <div className="slider__container">
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
        <Link to="/main" className="kakaoLoginButton">
          카카오 간편 로그인
          {/*<div className="mb">로고</div>*/}
        </Link>

      </div>
    </div>
  );
}

export default KaKaoLogin;