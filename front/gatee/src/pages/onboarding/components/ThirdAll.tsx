import React from 'react';
import Explain3 from "@assets/images/onboarding/explain3.png"
import {Link} from "react-router-dom";

const ThirdAll = () => {
  return (
    <div className={"slider__container"}>

      {/* 상단 설명 */}
      <div className="border mb">
        <p className="mb">우리 가족의 일정관리, 채팅, 앨범까지</p>
        <h2>올인원 가족 소통 어플리케이션</h2>
      </div>

      {/*  중간 캡쳐 사진 */}
      <div className="explain">
        <img src={Explain3}  alt=""/>
      </div>

      {/*  다음 버튼 */}
      <div className="buttonContainer">
        <Link to="/kakao" className="skipButton">
          다음
        </Link>
      </div>
    </div>
  );
}

export default ThirdAll;