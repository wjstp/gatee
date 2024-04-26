import React from 'react';
import {useNavigate} from "react-router-dom";

function MainIndex() {
  const navigate = useNavigate();

  const signupButtonClick = (): void => {
    navigate('/signup');
  }
  const gotoMission = (): void => {
    navigate('/mission');
  }

  return (
    <div>
      <span>메인</span>
      <div>
        <button onClick={signupButtonClick}>
          회원가입
        </button>
        <button onClick={gotoMission}>
          미션
        </button>
      </div>
    </div>
  );
}

export default MainIndex;