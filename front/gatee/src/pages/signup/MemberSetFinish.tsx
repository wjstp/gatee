import React from 'react';
import { useNavigate } from "react-router-dom";
import { useMemberStore } from "@store/useMemberStore";
import wholeFamily from "@assets/images/profile/whole_family.png"

const SignupMemberSetFinish = () => {
  const navigate = useNavigate();

  const { name } = useMemberStore();

  const goToMain = () => {
    navigate("/main");
  }

  return (
    <div className="signup-member-set-finish slide-in">
      {/*제목*/}
      <div className="signup-member-set-finish__title">
        <div className="title__header">
          <span className="title__part--01">
            {name}
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
          src={wholeFamily}
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