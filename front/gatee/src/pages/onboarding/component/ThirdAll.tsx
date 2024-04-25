import React from 'react';
import Explain3 from "../../../assets/onboarding/explain3.png"
import {Link} from "react-router-dom";

const ThirdAll = () => {
  return (
    <div className={"slider__container"}>
      <div className="border mb">
        <p className="mb">우리 가족의 일정관리, 채팅, 앨범까지</p>
        <h2>올인원 가족 소통 어플리케이션</h2>
      </div>
      <div className="explain pb">
        <img src={Explain3} className="explain" alt=""/>
      </div>
      <div className="buttonContainer">
        <Link to="/kakao" className="skipButton">
          다음
        </Link>
      </div>
    </div>
  );
}

export default ThirdAll;