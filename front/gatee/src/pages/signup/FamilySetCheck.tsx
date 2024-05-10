import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "@store/useFamilyStore";
import { createFamilyApi } from "@api/member";
import { AxiosError, AxiosResponse } from "axios";

const SignupFamilySetCheck = () => {
  const navigate = useNavigate();
  const { familyName, familyImage, stringImage } = useFamilyStore();

  // 초대 코드 공유 페이지로 가기
  const goToFamilySetShare = () => {
    // 가족 생성하기
    // createFamily();

    navigate("/signup/family-set/share");
  }

  // 파일을 업로드했을 때
  const createFamily = (): void => {
    const formData = new FormData();
    // 파일이 업로드 되어있으면 파일 이어붙이기
    if (familyImage instanceof File) {
      formData.append("file", familyImage);
    }
    formData.append("name", familyName);
    formData.append("fileType", "FAMILY_PROFILE");

    // 가족 생성 요청 보내기
    createFamilyApi(
      formData,
      (res: AxiosResponse<any>) => {
        console.log(res)
      },
      (err: AxiosError<any>) => {
        console.log(err)
      }
    ).then().catch();
  }

  // 뒤로 가기
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