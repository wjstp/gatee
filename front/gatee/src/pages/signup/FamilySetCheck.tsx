import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "@store/useFamilyStore";
import base64 from "base-64";

const SignupFamilySetCheck = () => {
  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const {
    familyName,
    stringImage,
  } = useFamilyStore();

  // 권한에 따라 redirect
  useEffect(() => {
    if (accessToken) {
      const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
      const decode = base64.decode(payload);
      const json = JSON.parse(decode);

      if (json.authorities[0] === "ROLE_ROLE_USER") {
        alert(`잘못된 접근입니다.`);
        navigate(`/main`);
      } else {
        if (!familyName) {
          alert('먼저 가족을 소개해주세요!');
          navigate(`/signup/family-set`);
        }
      }
    }
  }, []);


  // 초대 코드 공유 페이지로 가기
  const goToFamilySetShare = () => {;
    navigate('/signup/member-set');
  }

  // 뒤로 가기
  const backTo = ():void => {
    navigate(-1);
  }

  return (
    <div className="signup-family-set-check slide-in">

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
          src={stringImage}
          alt="family-image"
        />
      </div>

      {/*가족 이름*/}
      <div className="signup-family-set-check__name">
        <span className="name">{familyName}</span>
      </div>

      <div className="signup-family-set-check__btn">
        {/*가족 소개 버튼*/}
        <button
          className="btn-introduce"
          onClick={goToFamilySetShare}
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
            다시 입력할래요
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignupFamilySetCheck;