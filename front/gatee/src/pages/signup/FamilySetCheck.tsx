import React, {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "@store/useFamilyStore";
import { createFamilyApi } from "@api/member";
import { uploadFileApi } from "@api/file";
import upLoadImage from "@assets/images/profile/family.jpg";
import { AxiosError, AxiosResponse } from "axios";

const SignupFamilySetCheck = () => {
  const navigate = useNavigate();
  const { familyName, familyImage } = useFamilyStore();

  const [showImage, setShowImage] = useState<string>("");

  // 초대 코드 공유 페이지로 가기
  const goToFamilySetShare = () => {
    // 파일을 업로드했다면 같이 보내서 가족 생성하기
    if (familyImage instanceof File) {
      const formData = new FormData();
      formData.append("fileType", "FAMILY_PROFILE");
      formData.append("file", familyImage);

      uploadFileApi(
        formData,
        (res: AxiosResponse<any>) => {
          console.log()
        },
        (err: AxiosError<any>) => {
          console.log()
        }
      ).then().catch();

    // 파일을 업로드하지 않았다면 null로 보내서 기본 이미지로 가족 생성하기
    } else {

    }

    // navigate("/signup/family-set/share");
  }

  // 뒤로 가기
  const backTo = ():void => {
    navigate(-1);
  }

  // familyImage를 설정할 때마다 보여줄 이미지 바꾸기
  useEffect(() => {
    if (familyImage instanceof File) {
      const jpgUrl: string = URL.createObjectURL(familyImage);
      setShowImage(jpgUrl)
    }
  }, []);

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
          src={showImage ? showImage : upLoadImage}
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