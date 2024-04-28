import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";

const SignupFamilyJoinCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToMemberSet = () => {
    navigate("/signup/member-set");
  }

  const backTo = () => {
    navigate(-1);
  }

  return (
    <div className="signup-family-join-check">
      {/*가족 이미지*/}
      <div className="signup-family-join-check__img">
        <img
          className="img"
          src=""
          alt=""
        />
      </div>

      {/*가족 이름*/}
      <div className="signup-family-join-check__name">
        <span className="name">예삐네 가족</span>
      </div>

      <div className="signup-family-join-check__btn">
        {/*회원 등록 버튼*/}
        <button
          className="btn-join-member"
          onClick={goToMemberSet}
        >
          <span className="btn-join-member__text">
            입장하기
          </span>
        </button>
        <button
          className="btn-back"
          onClick={backTo}
        >
          <span className="btn-back__text">
            우리 가족이 아니에요
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignupFamilyJoinCheck;