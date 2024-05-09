import React, { useRef, useState, useEffect } from 'react';
import { IoIosCamera } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "@store/useFamilyStore";
import { imageResizer } from "@utils/imageResizer"
import upLoadImage from "@assets/images/profile/family.jpg";

const SignupFamilySet = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { familyName, setFamilyName, familyImage, setFamilyImage } = useFamilyStore();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showImage, setShowImage] = useState<string>("");

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 6) {
      setFamilyName(value);
      setErrorMessage("");
    }
  }

  // familyImage를 설정할 때마다 보여줄 이미지 바꾸기
  useEffect(() => {
    if (familyImage instanceof File) {
      const jpgUrl: string = URL.createObjectURL(familyImage);
      setShowImage(jpgUrl)
    }
  }, [familyImage]);

  // 이미지 선택 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>)=> {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const resizedFile: File = (await imageResizer(file)) as File;
      setFamilyImage(resizedFile);
    }
  }

  // 카메라 버튼 클릭 처리
  const handleCameraButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // 다음 버튼 클릭 처리
  const goToFamilySetCheck = (): void => {
    // 입력값 검증
    if (familyName.length < 1 || familyName.length > 6 || !/^[가-힣]*$/.test(familyName)) {
      // 오류 메시지 설정
      setErrorMessage("한글로 1~6글자를 입력해주세요.");
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return; // 함수 실행 중단
    } else {
      navigate("/signup/family-set/check");
    }
  }
  return (
    <div className="signup-family-set">

      {/*제목*/}
      <div className="signup-family-set__title">
        <span className="title__part--01">가족을 소개</span>
        <span className="title__part--02">해 주세요</span>
      </div>
      
      {/*가족 이미지*/}
      <div className="signup-family-set__img-box">
        <button
          className="img-box__btn"
          onClick={handleCameraButtonClick}
        >
          <img
            className="btn--img"
            src={showImage ? showImage : upLoadImage}
            alt="family-image"
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

      {/*가족 이름 입력창*/}
      <div className="signup-family-set__input-box">
        <input
          className="input-box__input"
          ref={inputRef}
          type="text"
          placeholder="예) 길동이네"
          value={familyName}
          onChange={handleInputChange}
        />
      </div>
      <div className="signup-family-set__error-message">
        {errorMessage ? (
          errorMessage
        ) : (
          '　'
        )}
      </div>

      {/*다음 버튼*/}
      <div className="signup-family-set__btn">
        <button className="btn-next"
          onClick={goToFamilySetCheck}
          disabled={!familyName}
        >
          <span className="btn-next__text">소개하기</span>
        </button>
      </div>

    </div>
  );
};

export default SignupFamilySet;