import React from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "assets/icons/home.svg";

function SignupIndex() {
  const navigate = useNavigate();
  // 누른 버튼에 따라 다른 상태 전달(렌더링 페이지 변경)
  const goToFamilySetInfo = (): void => {
    navigate('/signup/family', { state: { action: 'set-info' } });
  }
  const goToFamilyJoin = (): void => {
    navigate('/signup/family', { state: { action: 'join' } });
  }

  return (
    <div className="signupIndex">
      <div className="signupIndex__iconBox">
        <HomeIcon className="signupIndex__iconBox__icon" />
      </div>
      <div className="signupIndex__textBox">
        <span className="signupIndex__textBox__text1">가족과</span>
        <span className="signupIndex__textBox__text2">한발짝</span>
        <span className="signupIndex__textBox__text3">다가가 볼까요?</span>
      </div>
      <div className="signupIndex__createButtonBox">
        <button
          className="signupIndex__createButtonBox__createButton"
          onClick={goToFamilySetInfo}
        >
          내 가족 생성하기
        </button>
      </div>
      <div className="signupIndex__joinButtonBox">
        <button
          className="signupIndex__joinButtonBox__joinButton"
          onClick={goToFamilyJoin}
        >
          초대 코드 입력
        </button>
      </div>
    </div>
  );
}

export default SignupIndex;