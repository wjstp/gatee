import React from 'react';
import { useNavigate } from "react-router-dom";

const SignupMemberSetCheck = () => {
  const navigate = useNavigate();

  const goToMemberSetPermission = () => {
    navigate("/signup/member-set/permission");
  }

  const backTo = () => {
    navigate(-1);
  }

  return (
    <div className="signup-member-set-check">
      {/*제목*/}
      <div className="signup-member-set-check__title">
        <span className="title__text">
          정보를 확인해주세요
        </span>
      </div>

      {/*뒤로 가기 버튼*/}
      <div className="signup-member-set-check__btn-back">
        <button
          className="btn-back__btn"
          onClick={backTo}
        >
          <span className="btn__text">
            다시 입력할래요
          </span>
        </button>
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-check__btn-next">
        <button
          className="btn-next__btn"
          onClick={goToMemberSetPermission}
        >
            <span className="btn__text">
              다음
            </span>
        </button>
      </div>
    </div>
  );
};

export default SignupMemberSetCheck;