import React, {useState} from 'react';
import Explain2 from "../../../assets/onboarding/explain2.png"
import {useNavigate} from "react-router-dom";
const SecondDict = () => {
    const navigate = useNavigate();

    return (
        <div className={"onBoardingContainer"}>
            <div className="border mb">
                <p className="mb">질문들을 채워 가족들에게 나를 알려줘요</p>
                <h2>나만의 백과사전</h2>
            </div>
            <div className="explain">
                <img src={Explain2} width={200} alt=""/>
            </div>
            <div className="buttonContainer">
                <button className="skipButton"
                        onClick={() => navigate("kakao")}>
                    건너뛰기
                </button>
            </div>
        </div>
    );
}

export default SecondDict;