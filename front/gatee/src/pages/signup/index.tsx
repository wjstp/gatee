import React from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "@assets/images/icons/ic_home.svg"

const SignupIndex = () => {
  const navigate = useNavigate();

  const goToFamilySet = ():void => {
    navigate("/signup/family-set");
  }

  const goToFamilyJoin = ():void => {
    navigate("/signup/family-join");
  }

  return (
    <div className="signup-index">
      {/* 홈 아이콘 */}
      <div className="signup-index__icon">
        <HomeIcon className="icon" />
      </div>

      {/* 제목*/}
      <div className="signup-index__title">
        <span className="title__part--01">가족에게</span>
        <span className="title__part--02">한발짝</span>
        <span className="title__part--03">다가가 볼까요?</span>
      </div>

      <div className="signup-index__btn">
        {/* 생성 링크 */}
        <button
          className="btn-family-set"
          onClick={goToFamilySet}
        >
          <span className="btn-family-set__text">
            내 가족 생성하기
          </span>
        </button>

        {/* 입장 링크 */}
        <button
          className="btn-family-join"
          onClick={goToFamilyJoin}
        >
          <span className="btn-family-join__text">
            초대 코드 입력
          </span>
        </button>
      </div>

    </div>
  );
}

export default SignupIndex;