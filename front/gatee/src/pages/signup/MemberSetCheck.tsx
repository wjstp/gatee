import React, { useRef, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as MaleKid } from "@assets/images/signup/son.svg";
import { ReactComponent as MaleYoung } from "@assets/images/signup/dad.svg";
import { ReactComponent as MaleOld } from "@assets/images/signup/grandpa.svg";
import { ReactComponent as FemaleKid } from "@assets/images/signup/daughter.svg";
import { ReactComponent as FemaleYoung } from "@assets/images/signup/mom.svg";
import { ReactComponent as FemaleOld } from "@assets/images/signup/grandma.svg";
import { IoIosCamera } from "react-icons/io";

const SignupMemberSetCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputName = location.state?.inputName || "홍길동";
  const formattedDate = location.state?.formattedDate || "2024-04-05";
  const calendarType = location.state?.calendarType || "solar";
  const gender = location.state?.gender || "male";
  const selectedRole = location.state?.selectedRole || "dad";
  const selectedIcon = location.state?.selectedIcon || "kid";
  const inputRole = location.state?.inputRole || "";

  const [selectedProfileImage, setSelectedProfileImage] = useState<string | ArrayBuffer | null>(null);

  const goToMemberSetPermission = () => {
    navigate("/signup/member-set/permission");
  }

  const backTo = () => {
    navigate(-1);
  }

  // 이미지 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // 카메라 버튼 클릭 처리
  const handleCameraButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // 역할 변환 함수
  const changeRole = (role: string): string => {
    switch (role) {
      case "dad":
        return "아빠";
      case "son":
        return "아들";
      case "mom":
        return "엄마";
      case "daughter":
        return "딸";
      default:
        return role;
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
          정보를 확인해주세요
        </span>
      </div>

      {/*이미지*/}
      <div className="signup-member-set-check__img-box">
        {/*이미지 선택*/}
        {selectedProfileImage && (
          <img
            className="img-box__img-selected"
            src={selectedProfileImage.toString()}
            alt="profile-image"
          />
        )}
        {/*기본 이미지*/}
        {!selectedProfileImage && (
          <>
            {gender === "male" && selectedIcon === "kid" &&
              <MaleKid className="img-box__img-male-kid" />
            }
            {gender === "male" && selectedIcon === "young" &&
              <MaleYoung className="img-box__img-male-young" />
            }
            {gender === "male" && selectedIcon === "old" &&
              <MaleOld className="img-box__img-male-old" />
            }
            {gender === "female" && selectedIcon === "kid" &&
              <FemaleKid className="img-box__img-female-kid" />
            }
            {gender === "female" && selectedIcon === "young" &&
              <FemaleYoung className="img-box__img-female-young" />
            }
            {gender === "female" && selectedIcon === "old" &&
              <FemaleOld className="img-box__img-female-old" />
            }
          </>
        )}
        <input
          type="file"
          accept="image/*"
          style={{display: 'none'}}
          ref={fileInputRef}
          onChange={handleImageChange}
        />
        <button
          className="img-box__btn"
          onClick={handleCameraButtonClick}
        >
          <IoIosCamera
            className="btn__icon"
            size={29}
          />
        </button>
      </div>

      {/*가입 정보*/}
      <div className="signup-member-set-check__info">
        <div className="info-header">
          <div className="info-header__name">
            <span className="name--text">
              {inputName}
            </span>
          </div>
        </div>
        <div className="info-body">
          <div className="info-body__role">
            <span className="role__part--01">
              당신의 역할은
            </span>
            <span className="role__part--02">
              &nbsp;{inputRole ? inputRole : changeRole(selectedRole)}
            </span>
            <span className="role__part--03">
              입니다
            </span>
          </div>
          <div className="info-body__birth">
            <span className="birth__part--01">
              {changeDate(formattedDate)}
            </span>
            <span className="birth__part--02">
              에 태어났어요
            </span>
          </div>
        </div>
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