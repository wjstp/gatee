import React from 'react';
import { BiCopy } from "react-icons/bi";
import { useNavigate, useLocation } from "react-router-dom";
import SampleFamily from "@assets/images/signup/sample.svg"

const SignupFamilySetShare = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputValue = location.state?.inputValue || "";
  const selectedImage = location.state?.selectedImage || "";

  const goToMemberSet = () => {
    navigate("/signup/member-set");
  }

  return (
    <div className="signup-family-set-share">
      {/*제목*/}
      <div className="signup-family-set-share__title">
        <span className="title__part--01">가족을 초대</span>
        <span className="title__part--02">해 봐요</span>
      </div>

      {/*가족 이미지*/}
      <div className="signup-family-set-share__img">
        <img
          className="img"
          src={selectedImage || SampleFamily}
          alt="family-image"
        />
      </div>

      {/*가족 이름*/}
      <div className="signup-family-set-share__name">
        <span className="name">
          {inputValue}
        </span>
      </div>

      {/*코드 박스*/}
      <div className="signup-family-set-share__code-box">
        {/*코드 문구*/}
        <span className="code-box__text">
          초대 코드
        </span>
        {/*코드*/}
        <span className="code-box__code">
          A43959FE
        </span>
        {/*복사 버튼*/}
        <div className="code-box__btn">
          <button className="btn-copy">
            <BiCopy
              className="btn-copy__icon"
              size={24}
            />
          </button>
        </div>
      </div>

      {/*카카오톡 공유하기 버튼*/}
      <div className="signup-family-set-share__btn-kakao">
        <button
          className="btn-kakao__btn"
        >
          <span className="btn__text">
            KaKao
          </span>
        </button>
      </div>

      {/* 다음 버튼 */}
      <div className="signup-family-set-share__btn-next">
        <button
          className="btn-next__btn"
          onClick={goToMemberSet}
        >
          <span className="btn__text">
            다음
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignupFamilySetShare;