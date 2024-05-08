import React, { useRef, useState, useEffect } from 'react';
import { IoIosCamera } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import basicFamily from "@assets/images/signup/basic.svg"
import { useFamilyStore } from "@store/useFamilyStore";

const SignupFamilySet = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { familyName, setFamilyName, familyImage, setFamilyImage } = useFamilyStore();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 6) {
      setFamilyName(value);
      setErrorMessage("");
    }
  }

  // useEffect(() => {
  //   if (selectedFile) {
  //     // useResizer Hook을 여기서 호출
  //     const resize_file = useResizer(selectedFile);
  //     // 처리된 파일을 상태에 저장하거나 다른 처리를 수행
  //     console.log(resize_file);
  //   }
  // }, [selectedFile]); // selectedFile이 변경될 때마다 실행


  // 이미지 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      // const reader: FileReader = new FileReader();
      setSelectedFile(file);

      // reader.onloadend = (e: ProgressEvent<FileReader>) => {
      //   const image = new Image();
      //   console.log(e);
      //   if (e.target?.result) {
      //     image.src = e.target.result as string
      //   }
      //
      //   image.onload = () => {
      //     // 캔버스 생성
      //     const canvas = document.createElement("canvas");
      //     const ctx = canvas.getContext('2d');
      //     if (!ctx) {
      //       console.error('캔버스 생성 불가')
      //       return;
      //     }
      //
      //     canvas.width = image.width;
      //     canvas.height = image.height;
      //     ctx.drawImage(image, 0, 0, image.width, image.height);
      //
      //     // JPG 변환
      //     const jpgUrl = canvas.toDataURL('image/jpeg', 1.0);
      //     // setFamilyImage(jpgUrl);
      //     setFamilyImage(reader.result);
      //     console.log('jpgUrl', jpgUrl);
      //   }
      //   console.log('image',image);
      // };
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
            src={familyImage ? familyImage.toString() : basicFamily}
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
          maxLength={6}
          autoFocus
        />
      </div>
      <div className="signup-family-set__error-message">
        {errorMessage ? errorMessage : null}
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