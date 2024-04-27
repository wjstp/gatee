import React from 'react';
import {useNavigate} from "react-router-dom";

function MainIndex() {
  const navigate = useNavigate();


  const goto = (destination: string): void => {
    navigate(destination);
  }
  return (
    <div>
      <span>메인</span>
      <div>
        <button onClick={() => goto("/signup")}>
          회원가입
        </button>
        <button onClick={() => goto('/mission')}>
          미션
        </button>
        <button onClick={() => goto('/character')}>
          백과사전
        </button>
      </div>
    </div>
  );
}

export default MainIndex;