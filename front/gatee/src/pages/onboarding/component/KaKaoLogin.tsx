import React from 'react';
import {ReactComponent as LineLogo} from "../../../assets/logo/logo_line.svg"
import {useNavigate} from "react-router-dom";

const KaKaoLogin = () => {
    const navigate = useNavigate();
    // 회원가입으로 가기
    const goto = () => {
        navigate("/signup")
    }
    return (
        <div>
            <div className="onBoardingContainer">
                <div className="textFlex">
                    <h2>가족들과 같이, </h2><h1>가티</h1>
                </div>
                <div className="explain">
                <LineLogo  width={150} height={150} />
                    <div className="emptyBox"></div>
                </div>
            <div className="kakaoLoginButton" onClick={goto}>
                카카오 간편 로그인
                {/*<div className="mb">로고</div>*/}
            </div>
            </div>
        </div>
    );
}

export default KaKaoLogin;