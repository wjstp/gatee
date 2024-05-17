import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { IoIosCamera } from "react-icons/io";
import { useMemberStore } from "@store/useMemberStore";
import {createFamilyApi, createMemberApi, createFamilyCodeApi, joinFamilyApi} from "@api/member";
import { AxiosResponse, AxiosError } from "axios";
import { useFamilyStore } from "@store/useFamilyStore";
import dayjs from 'dayjs';
import ProfileCropper from "@pages/profile/components/Cropper";
import useModal from "@hooks/useModal";
import { modifyProfileImageApi } from "@api/profile";
import { imageResizer } from "@utils/imageResizer";
import base64 from "base-64";
import Loading from "@components/Loading";

const SignupMemberSetCheck = () => {
  const location = useLocation();
  const icon: string = location.state?.icon;
  const navigate = useNavigate();
  const sender: string = "member-set"
  const fileInputRef = useRef<HTMLInputElement>(null);
  const accessToken: string | null = localStorage.getItem("accessToken");

  const { isOpen, openModal, closeModal } = useModal();
  const {
    name,
    role,
    birth,
    birthType,
    memberImage,
    stringMemberImage,
  } = useMemberStore();
  const {
    familyId,
    setFamilyId,
    familyImage,
    familyName,
    familyCode,
    setFamilyCode,
  } = useFamilyStore();

  const [cropImage, setCropImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);

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
        } else {
          if (!name) {
            alert('먼저 이름을 입력해주세요!');
            navigate(`/signup/member-set`);
          } else {
            if (!birth) {
              alert('먼저 생일을 입력해주세요!');
              navigate(`/signup/member-set/birth`);
            } else {
              if (!role) {
                alert('먼저 역할을 입력해주세요!');
                navigate(`/signup/member-set/role`);
              }
            }
          }
        }
      }
    }
  }, []);

  // 로딩 교체
  const changeLoading = () => {
    setIsLoading(!isLoading);
  }

  // 다음 넘어가기
  const goToMemberSetPermission = () => {
    // 로딩 시작
    changeLoading();
    
    // 코드 여부에 따라 동작 변경
    if (familyCode) {
      joinFamily();
    } else {
      createFamily();
    }
  }

  // 가족 생성하기
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
        console.log(res);
        setFamilyId(res.data.familyId);

        // 회원 생성
        createMember(res.data.familyId);
      },
      (err: AxiosError<any>) => {
        console.log(err)
        alert("에러가 발생했습니다.\n다시 로그인해보실래요?");
        navigate("/kakao");
      }
    ).then().catch();
  }

  // 가족 합류 api
  const joinFamily = () => {
    joinFamilyApi(
      {
        familyCode: familyCode
      },
      (res: AxiosResponse<any>) => {
        console.log(res);
        createMember(familyId);
      },
      (err: AxiosError<any>) => {
        console.log(err);
        alert("에러가 발생했습니다.\n다시 로그인해보실래요?");
        navigate("/kakao");
      }
    ).then().catch();
  }

  // 회원 정보 등록
  const createMember = (familyId: string) => {
    if (birth && role) {
      createMemberApi(
        {
          name: name,
          nickname: name,
          birth: birth,
          birthType: birthType,
          role: role,
          familyId: familyId,
          phoneNumber: null
        },
        (res: AxiosResponse<any>) => {
          console.log("멤버 등록 성공", res);
          // 토큰 갱신
          const accessToken = res.headers.authorization.split(' ')[1];
          localStorage.setItem("accessToken", accessToken);
          console.log(accessToken)
        },
        (err: AxiosError<any>): void => {
          console.log(err);
          alert("에러가 발생했습니다.\n다시 입력해보실래요?");
          navigate("/signup/member-set/check");
        }
      ).then(
        // 이미지 수정
        () => {modifyProfileImage()}
      ).catch();
    }
  }

  // 회원 이미지 수정
  const modifyProfileImage = () => {
    const formData = new FormData();
    formData.append("fileType", "MEMBER_PROFILE");
    if (memberImage) {
      formData.append("file", memberImage);
    } else {
      formData.append("defaultImage", icon);
    }

    // 프로필 이미지 수정 요청 보내기
    modifyProfileImageApi(
      formData,
      (res: AxiosResponse<any>) => {
        console.log("이미지 수정 성공", res);

        // 패밀리 코드가 있다면 바로 가입축하로 넘기기
        if (familyCode) {
          navigate(`/signup/member-set/finish`, {
            state: {
              from: "member-set-check"
            }
          });
        } else {
          // 가족 코드 생성
          createFamilyCode();
        }
      },
      (err: AxiosError<any>) => {
        console.log(err);
        alert("에러가 발생했습니다.\n다시 입력해보실래요?");
        navigate("/signup/member-set/check");
      }
    )
  }

  // 가족 코드 생성
  const createFamilyCode = () => {
    createFamilyCodeApi(
      {
        familyId: familyId,
      },
      (res: AxiosResponse<any>) => {
        console.log("코드 생성 성공", res);
        // 가족 코드 집어넣기
        setFamilyCode(res.data.familyCode);
        navigate("/signup/member-set/share", {
          state: {
            from: 'member-set'
          }
        });
      },
      (err: AxiosError<any>): void => {
        console.log(err);
        alert("에러가 발생했습니다.\n다시 입력해보실래요?");
        navigate("/signup/member-set/check");
      }
    ).then().catch();
  }

  // 다시 입력하기
  const backTo = () => {
    navigate(`/signup/member-set`);
  }

  // 이미지 선택 처리
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

  // 날짜 형식 변환 함수
  const changeDate = (originalDate: string): string => {
    const formattedDate = dayjs(originalDate).format("YYYY년 M월 D일");

    return formattedDate;
  }

  // 모달 이벤트
  const handleModalEvent = () => {
    // 모달 종료
    closeModal();
  }

  return (
    <div className="signup-member-set-check slide-in">

      {/*로딩*/}
      {isLoading ? (
        <div className="signup-member-set-check__loading">
          <Loading/>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default SignupMemberSetCheck;