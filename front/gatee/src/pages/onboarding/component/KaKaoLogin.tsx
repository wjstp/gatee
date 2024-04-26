import React from 'react';
import {ReactComponent as LineLogo} from "../../../assets/logo/logo_line.svg"
import {Link} from "react-router-dom";

const KaKaoLogin = () => {

  return (
    <div className="onboarding__container-center">
      <div className="slider__container">
        <div className="textFlex">
          <h2>가족들과 같이, </h2><h1>가티</h1>
        </div>
        <div className="explain">
          <LineLogo width={150} height={150}/>
          <div className="emptyBox"></div>
        </div>
        <Link to="/main" className="kakaoLoginButton">
          카카오 간편 로그인
          {/*<div className="mb">로고</div>*/}
        </Link>
      </div>
    </div>
  );
}

export default KaKaoLogin;