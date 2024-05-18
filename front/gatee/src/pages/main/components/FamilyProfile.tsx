import React, {useEffect, useRef, useState} from 'react';
import useModal from "@hooks/useModal";
import ProfileCropper from "@pages/profile/components/Cropper";
import { imageResizer } from "@utils/imageResizer";
import { useFamilyStore } from "@store/useFamilyStore";
import {IoIosCamera} from "react-icons/io";
import {changeFamilyImageApi, changeFamilyNameApi} from "@api/member";
import {AxiosError, AxiosResponse} from "axios";
import {Simulate} from "react-dom/test-utils";
import input = Simulate.input;

const FamilyProfile = (props: {
  handleFinishModal: () => void
}) => {
  const sender: string = "family-profile"
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { handleFinishModal } = props;
  const {
    familyId,
    familyName,
    setFamilyName,
    setFamilyImage,
    stringImage,
    setStringImage,
    inputImage,
    setInputImage,
    inputStringImage,
    setInputStringImage,
  } = useFamilyStore();
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    setInputImage(null);
    setInputStringImage(stringImage);
  }, []);

  const [inputName, setInputName] = useState<string>(familyName);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [cropImage, setCropImage] = useState<string>("");

  // 모달 내용 클릭 시 이벤트 전파 막기
  const handleContentClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 6) {
      setInputName(value);
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

  // 모달 이벤트
  const handleModalEvent = () => {
    // 모달 종료
    closeModal();
  }

  // 저장하기
  const handleSave = () => {
    // 입력값 검증
    if (inputName.length < 1 || inputName.length > 6 || !/^[가-힣]*$/.test(inputName)) {
      // 오류 메시지 설정
      setErrorMessage("한글로 1~6글자를 입력해주세요.");
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // 함수 실행 중단
      return;
    } else {
      if (inputImage) {
       changeFamilyImage();
      } else {
        if (inputName !== familyName) {
          changeFamilyName();
        } else {
         handleFinishModal();
        }
      }
    }
  }

  // 가족 이미지 수정 api
  const changeFamilyImage = () => {
    const formData = new FormData();
    if (inputImage) {
      formData.append("file", inputImage);
      formData.append("fileType", "FAMILY_PROFILE");
      console.log(formData);

      changeFamilyImageApi(
        formData,
        (res: AxiosResponse<any>) => {
          console.log(res);
          setStringImage(inputStringImage);

          if (inputName !== familyName) {
            changeFamilyName();
          } else {
            handleFinishModal();
          }
        },
        (err: AxiosError<any>) => {
          console.log(err);
        }
      ).then().catch();
    }
  }

  // 가족 이름 수정 api
  const changeFamilyName = () => {
    const data = {
      name: inputName,
      familyId: familyId
    }

    changeFamilyNameApi(
      data,
      (res: AxiosResponse<any>) => {
        console.log(res);
        setFamilyName(inputName);
        handleFinishModal();
      },
      (err: AxiosError<any>) => {
        console.log(err)
      }
    ).then().catch();
  }

  return (
    <div className="family-profile" onClick={handleFinishModal}>

      <div className="family-profile__content" onClick={handleContentClick}>

        {/*가족 이미지*/}
        <div className="family-profile__content__img-box">
          <button
            className="img-box__btn"
            onClick={handleCameraButtonClick}
          >
            <img
              className="btn--img"
              src={inputStringImage}
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
        <div className="family-profile__content__input-box">
          <input
            className="input-box__input"
            ref={inputRef}
            type="text"
            placeholder="예) 길동이네"
            value={inputName}
            onChange={handleInputChange}
            spellCheck={false}
          />
        </div>
        <div className="family-profile__content__error-message">
          {errorMessage ? (
            errorMessage
          ) : (
            '　'
          )}
        </div>

        <div className="family-profile__content__btn">
          <button
            className="btn-cancel"
            onClick={handleFinishModal}
          >
              <span className="btn-cancel--text">
              취소
              </span>
          </button>
          <button
            className="btn-save"
            onClick={handleSave}
          >
          <span className="btn-save--text">
            저장
          </span>
          </button>
        </div>
      </div>

    </div>
  );
};

export default FamilyProfile;