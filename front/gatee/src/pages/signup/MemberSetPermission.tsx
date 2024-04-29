import React from 'react';
import { useNavigate } from "react-router-dom";

const SignupMemberSetPermission = () => {
  const navigate = useNavigate();

  const goToMemberSetFinish = () => {
    navigate("/signup/member-set/finish");
  }

  return (
    <div className="signup-member-set-permission">
      {/*제목*/}
      <div className="signup-member-set-permission__title">
        <span className="title__part--01">
          원활한 서비스 이용을 위해
        </span>
        <span className="title__part--02">
          다음 앱 권한을 허용해주세요
        </span>
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-permission__btn">
        <button
          className="btn-next"
          onClick={goToMemberSetFinish}
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>
    </div>
  );
};

export default SignupMemberSetPermission;