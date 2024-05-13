import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";
import { useFamilyStore } from "@store/useFamilyStore";
import { getFamilyMemberApi, getMyDataApi } from "@api/member";

const SignupFamilyJoin = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { setFamilyCode, setFamilyId } = useFamilyStore();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [code, setCode] = useState<string>("");

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 8) {
      setCode(value);
      setErrorMessage("");
    }
  }

  // 입력하기 버튼 클릭 처리
  const goToFamilyJoinCheck = (): void => {
    // 입력값이 8글자의 대문자 영어와 숫자로 구성되어 있는지 확인
    if (code.length !== 8 || !/^[a-zA-Z0-9]*$/.test(code)) {
      setErrorMessage('8글자의 영어와 숫자만 입력해주세요.');
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return; // 함수 실행 중단
    } else {
      // getFamily();
      getMyData();
      // navigate("/signup/family-join/check");
    }
  };
  
  // 가족 정보 조회하기
  const getFamily = () => {
    getFamilyMemberApi(
      {
        familyId: "71631a5a-f9b5-4c3f-9f4e-957a9f7b5a19"
      },
      (res: AxiosResponse<any>) => {
        console.log(res);
        setFamilyCode(code);
      },
      (err: AxiosError<any>) => {
        console.log(err);
      }
    ).then().catch();
  }

  // 가족 생성 버튼 클릭 처리
  const goToFamilySet = (): void => {
    navigate("/signup/family-set");
  }

  // 멤버 조회
  const getMyData = () => {
    getMyDataApi(
      (res: AxiosResponse<any>) => {
        console.log(res)
        setFamilyId(res.data.familyId);
      },
      (err: AxiosError<any>) => {
        console.log(err)
      }
    ).then().catch();
  }

  return (
    <div className="signup-family-join slide-in">

      {/*제목*/}
      <div className="signup-family-join__title">
        <span className="title__part--01">
          초대 코드를 입력
        </span>
        <span className="title__part--02">
            해 주세요
        </span>
      </div>

      {/*코드 입력 박스*/}
      <div className="signup-family-join__input-box">
        <input
          className="input-box__input"
          ref={inputRef}
          type="text"
          pattern="[가-힣]*"
          placeholder="예) A43959FE "
          value={code}
          onChange={handleInputChange}
        />
      </div>
      <div className="signup-family-set__error-message">
        {errorMessage ? (
          errorMessage
        ) : (
          "　"
        )}
      </div>

      {/*입력하기 버튼*/}
      <div className="signup-family-join__btn">
        <button
          className="btn-input"
          onClick={goToFamilyJoinCheck}
          disabled={!code}
        >
            <span className="btn-input__text">
              입력하기
            </span>
        </button>
      </div>

      {/*가족 생성*/}
      <div className="signup-family-join__create">
        <button
          className="btn-create"
          onClick={goToFamilySet}
        >
          <span className="btn-create__text">
            초대 코드를 받지 못했나요?
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignupFamilyJoin;