import React, {useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { IoIosCamera } from "react-icons/io";
import { useMemberStore } from "@store/useMemberStore";
import { imageResizer } from "@utils/imageResizer";
import { createMemberApi, createFamilyCodeApi } from "@api/member";
import { AxiosResponse, AxiosError } from "axios";
import { useFamilyStore } from "@store/useFamilyStore";
import { uploadFileApi } from "@api/file";
import dayjs from 'dayjs';
import ProfileCropper from "@pages/profile/components/Cropper";
import useModal from "@hooks/useModal";

const SignupMemberSetCheck = () => {
  const navigate = useNavigate();
  const sender: string = "member-set"
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const {
    name,
    role,
    birth,
    birthType,
    memberImage,
    setMemberImage,
    stringMemberImage,
    setStringMemberImage,
  } = useMemberStore();
  const { familyId, setFamilyCode } = useFamilyStore();

  const [cropImage, setCropImage] = useState<string>("");

  // 다음 넘어가기
  const goToMemberSetPermission = () => {
    // uploadFile();
    // createMember();
    createFamilyCode();
    // navigate("/signup/member-set/share");
  }

  // 멤버 프로필 파일 업로드
  const uploadFile = () => {
    const formData = new FormData;
    if (memberImage) {
      formData.append("file", memberImage);
      formData.append("fileType", "MEMBER_PROFILE")
    }
    uploadFileApi(
      formData,
      (res: AxiosResponse<any>) => {
        console.log(res)
        // 이미지 저장
        setStringMemberImage(res.data.imageUrl);

        // 멤버 등록
        // createMember();
      },
      (err: AxiosError<any>) => {
        console.log(err)
      }
    )
  }

  // 회원 생성
  const createMember = () => {
    if (birth && role) {
      createMemberApi(
        {
          name: name,
          nickname: name,
          birth: birth,
          birthType: birthType,
          role: role,
          familyId: "71631a5a-f9b5-4c3f-9f4e-957a9f7b5a19",
          phoneNumber: null
        },
        (res: AxiosResponse<any>) => {
          console.log(res);
          createFamilyCode();
        },
        (err: AxiosError<any>): void => {
          console.log(err);
        })
    }
  }

  // 가족 코드 생성
  const createFamilyCode = () => {
    createFamilyCodeApi(
      {
        familyId: "71631a5a-f9b5-4c3f-9f4e-957a9f7b5a19"
      },
      (res: AxiosResponse<any>) => {
        console.log(res);
        // 가족 코드 집어넣기
        setFamilyCode(res.data.familyCode);
        navigate("/signup/member-set/share");
      },
      (err: AxiosError<any>): void => {
        console.log(err);
      }
    )
  }

  // 뒤로 가기
  const backTo = () => {
    navigate(-1);
  }

  // 이미지 선택 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;
    if (file) {
      // 크롭할 이미지 넣기
      const jpgUrl = URL.createObjectURL(file);
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

  // 날짜 형식 변환 함수
  const changeDate = (originalDate: string): string => {
    const formattedDate = dayjs(originalDate).format("YYYY.MM.DD");

    return formattedDate;
  }

  // 모달 이벤트
  const handleModalEvent = () => {
    // 모달 종료
    closeModal();
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

      {/*크롭 모달*/}
      {isOpen ? (
        <ProfileCropper
          cropImage={cropImage}
          cropShape={"round"}
          handleModalEvent={handleModalEvent}
          sender={sender}
        />
      ) : (
        null
      )}

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
              {birth ? changeDate(birth) : null}
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