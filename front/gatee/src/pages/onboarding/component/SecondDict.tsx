import React from 'react';
import Explain2 from "@assets/images/onboarding/explain2.png"
import {Link} from "react-router-dom";

const SecondDict = () => {

  return (
    <div className={"slider__container"}>

      {/* 상단 설명 */}
      <div className="border mb">
        <p className="mb">질문들을 채워 가족들에게 나를 알려줘요</p>
        <h2>나만의 백과사전</h2>
      </div>

      {/*  캡쳐 화면 */}
      <div className="explain">
        <img src={Explain2} width={200} alt=""/>
      </div>

      {/* 건너 뛰기 */}
      <div className="buttonContainer">
        <Link to="/kakao" className="skipButton">
          건너뛰기
        </Link>
      </div>
    </div>
  );
}

export default SecondDict;