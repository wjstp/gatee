import React from 'react';
import { useNavigate } from "react-router-dom";
import Finish from "@assets/images/signup/finish.svg"

const SignupMemberSetFinish = () => {
  const navigate = useNavigate();

  const member = {
    id: "33",
    memberName: "홍길동",
  }

  const goToMain = () => {
    navigate("/main");
  }

  return (
    <div className="signup-member-set-finish">
      {/*제목*/}
      <div className="signup-member-set-finish__title">
        <div className="title__header">
          <span className="title__part--01">
            {member.memberName}
          </span>
          <span className="title__part--02">
            님,
          </span>
        </div>
        <div className="title__body">
          <span className="title__part--03">
            회원 가입을 축하합니다!
          </span>
        </div>
      </div>

      {/*그림*/}
      <div className="signup-member-set-finish__img">
        <img
          className="img"
          src={Finish}
          alt=""
        />
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-finish__btn">
        <button
          className="btn-next"
          onClick={goToMain}
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>
    </div>
  );
};

export default SignupMemberSetFinish;