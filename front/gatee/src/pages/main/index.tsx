import React from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as House} from "@assets/images/main/main_home.svg";
import HeartAnimation from "@assets/images/animation/heart_animation.json"
import Lottie from "lottie-react";
import { PiTarget } from "react-icons/pi";
import {FamilyPoint} from "@pages/main/components/FamilyPoint";
import ProfileList from "@pages/main/components/ProfileList";
import {FamilyMemberInfoSample} from "@constants/index";


const MainIndex = () => {


  return (
    <div className="main-container">
      {/*
      <div style={{
            display: "absolute",
            flexDirection: "column",
            gap: "1rem",
            margin: "1rem"
            }}>
            <Link to="/signup">회원가입</Link>
            <Link to="/mission">미션</Link>
            <Link to="/character">백과사전</Link>
          </div>*/}

      {/* 가족 온도 */}
      <FamilyPoint/>

      {/* 프로필 리스트 */}
      <ProfileList profileDataList={FamilyMemberInfoSample}/>

      {/* 미션 탭으로 가기 */}
      <Link to="/main/mission" className="go-to-mission__button-event">
        <PiTarget size={35}/>
        <p>미션</p>
      </Link>

      <Lottie className="main-heart-animation" animationData={HeartAnimation}/>
      <House className="main-house-img"/>

    </div>
  );
}


export default MainIndex;