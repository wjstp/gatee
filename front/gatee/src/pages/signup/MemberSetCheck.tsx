import React, { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosCamera } from "react-icons/io";
import { useMemberStore } from "@store/useMemberStore";
import { imageResizer } from "@utils/imageResizer";
import { createMemberApi } from "@api/member";
import { AxiosResponse, AxiosError } from "axios";

const SignupMemberSetCheck = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    name,
    role,
    birthDay,
    birthType,
    memberImage,
    setMemberImage,
    stringMemberImage,
    setStringMemberImage,
  } = useMemberStore();

  console.log(name)
  console.log(birthDay)
  console.log(birthType)
  console.log(role)

  // 회원 생성
  const createMember = () => {
    if (birthDay && role) {
      createMemberApi(
        {
          name: name,
          nickname: name,
          birth: birthDay,
          birthType: birthType,
          role: "MOTHER",
          familyId: "2f3bf47b-c6ea-47fe-9c5e-03110009d1ae",
          phoneNumber: "010-8806-8489"
        },
        (res: AxiosResponse<any>) => {
          console.log(res);
        },
        (err: AxiosError<any>): void => {
          console.log(err);
        })
    }
  }

  // 다음 넘어가기
  const goToMemberSetPermission = () => {
    createMember();
    // navigate("/signup/member-set/permission");
  }

  // 뒤로 가기
  const backTo = () => {
    navigate(-1);
  }

  // 이미지 선택 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const resizedFile: File = (await imageResizer(file, 1000, 1000)) as File;
      const jpgUrl = URL.createObjectURL(resizedFile);
      setMemberImage(resizedFile);
      setStringMemberImage(jpgUrl);
    }
  }
  console.log(memberImage);
  // 카메라 버튼 클릭 처리
  const handleCameraButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // 날짜 형식 변환 함수
  const changeDate = (originalDate: string): string => {
    const date = new Date(originalDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month}.${day}`;
  }

  return (
    <div className="signup-member-set-check">

      {/*제목*/}
      <div className="signup-member-set-check__title">
        <span className="title__text">
          정보를 확인해 주세요
        </span>
      </div>

      {/*이미지*/}
      <div className="signup-member-set-check__img-box">
        <button
          className="img-box__btn"
          onClick={handleCameraButtonClick}
        >
          <img
            className="btn__img"
            src={stringMemberImage}
            alt="member-image"
          />
          <input
            type="file"
            accept="image/*"
            style={{display: 'none'}}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <div className="btn--icon">
            <IoIosCamera
              className="icon"
              size={25}
            />
          </div>
        </button>
      </div>

      {/*가입 정보*/}
      <div className="signup-member-set-check__info">

        {/*이름*/}
        <div className="info-header">
          <div className="info-header__name">
            <span className="name--text">
              {name}
            </span>
          </div>
        </div>
        
        {/*역할 및 생일*/}
        <div className="info-body">
          
          {/*역할*/}
          <div className="info-body__role">
            <span className="role__part--01">
              당신의 역할은
            </span>
            <span className="role__part--02">
              &nbsp;{role}
            </span>
            <span className="role__part--03">
              입니다
            </span>
          </div>
          
          {/*생일*/}
          <div className="info-body__birth">
            <span className="birth__part--01">
              {birthDay ? changeDate(birthDay) : null}
            </span>
            <span className="birth__part--02">
              에 태어났어요
            </span>
          </div>

        </div>
        
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-check__btn-next">
        <button
          className="btn-next__btn"
          onClick={goToMemberSetPermission}
        >
            <span className="btn__text">
              가입하기
            </span>
        </button>
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

    </div>
  );
};

export default SignupMemberSetCheck;