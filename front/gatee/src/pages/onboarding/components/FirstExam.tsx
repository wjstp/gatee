import React from 'react';
import Explain1 from "@assets/images/onboarding/explain1.png"
import {Link} from "react-router-dom";

const FirstExam = () => {
  return (
    <div className={"slider__container "}>

      {/* 상단 설명 */}
      <div className="border mb">
        <p className="mb">내가 몰랐던 가족의 정보와 취향을 맞춰봐요</p>
        <h2>가족 탐구 영역, 나는 몇 등급?</h2>
      </div>

      {/* 캡쳐 사진 */}
      <div className="explain">
        <img src={Explain1} width={200} alt=""/>
      </div>
      <div className="buttonContainer">
        <Link to="/kakao" className="skipButton">
          건너뛰기
        </Link>
      </div>
    </div>
  );
}

export default FirstExam;