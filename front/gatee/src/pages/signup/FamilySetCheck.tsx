import React from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import SampleFamily from "@assets/images/signup/sample.svg"

const SignupFamilySetCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputValue = location.state?.inputValue || "";
  const selectedImage = location.state?.selectedImage || "";

  const goToFamilySetCheck = () => {
    navigate("/signup/family-set/share", {
      state: {
        inputValue,
        selectedImage
      }
    });
  }

  const backTo = ():void => {
    navigate(-1);
  }

  return (
    <div className="signup-family-set-check">
      {/*제목*/}
      <div className="signup-family-set-check__title">
        <span className="title__part--01">
          이렇게 소개
        </span>
        <span className="title__part--02">
          할까요?
        </span>
      </div>

      {/*가족 이미지*/}
      <div className="signup-family-set-check__img">
        <img
          className="img"
          src={selectedImage || SampleFamily}
          alt="family-image"
        />
      </div>

      {/*가족 이름*/}
      <div className="signup-family-set-check__name">
        <span className="name">{inputValue}</span>
      </div>

      <div className="signup-family-set-check__btn">
        {/*가족 소개 버튼*/}
        <button
          className="btn-introduce"
          onClick={goToFamilySetCheck}
        >
          <span className="btn-introduce__text">
            소개하기
          </span>
        </button>

        {/*뒤로 가기 버튼*/}
        <button
          className="btn-back"
          onClick={backTo}
        >
          <span className="btn-back__text">
            다르게 소개할래요
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignupFamilySetCheck;