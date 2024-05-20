import React, { useRef, useState, useEffect } from 'react';
import { IoIosCamera } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "@store/useFamilyStore";
import basicFamily from "@assets/images/profile/family.jpg";
import ProfileCropper from "@pages/profile/components/Cropper";
import useModal from "@hooks/useModal";
import { imageResizer } from "@utils/imageResizer";
import base64 from "base-64";
import {PiCaretLeft} from "react-icons/pi";

const SignupFamilySet = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const sender: string = "family-set"
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { familyName, setFamilyName, setFamilyImage, stringImage, setStringImage } = useFamilyStore();
  const { isOpen, openModal, closeModal } = useModal();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cropImage, setCropImage] = useState<string>("");

  // 사진초기화
  useEffect(() => {
    setFamilyImage(null);
    setStringImage(basicFamily);

    // 권한에 따라 redirect
    if (accessToken) {
      const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
      const decode = base64.decode(payload);
      const json = JSON.parse(decode);

      if (json.authorities[0] === "ROLE_ROLE_USER") {
        alert(`잘못된 접근입니다.`);
        navigate(`/main`);
      }
    }
  }, []);

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 6) {
      setFamilyName(value);
      setErrorMessage("");
    }
  }

  // 이미지 선택 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>)=> {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      const resizedFile: File = (await imageResizer(file, 2000, 2000)) as File;
      // 크롭할 이미지 넣기
      const jpgUrl = URL.createObjectURL(resizedFile);

      setCropImage(jpgUrl);
      // 모달 열기
      openModal();
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
      // 함수 실행 중단
      return;
    } else {
      navigate("/signup/family-set/check");
    }
  }

  // 모달 이벤트
  const handleModalEvent = () => {
    // 모달 종료
    closeModal();
  }

  // 뒤로 가기
  const backTo = ():void => {
    navigate(-1);
  }

  return (
    <div className="signup-family-set slide-in">

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
            src={stringImage}
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

      {/*크롭 모달*/}
      {isOpen ? (
        <ProfileCropper
          cropImage={cropImage}
          cropShape={"rect"}
          handleModalEvent={handleModalEvent}
          sender={sender}
        />
      ) : (
        null
      )}

      {/*가족 이름 입력창*/}
      <div className="signup-family-set__input-box">
        <input
          className="input-box__input"
          ref={inputRef}
          type="text"
          placeholder="예) 길동이네"
          value={familyName}
          onChange={handleInputChange}
          spellCheck={false}
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
          <span className="btn-next__text">
            소개하기
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignupFamilySet;