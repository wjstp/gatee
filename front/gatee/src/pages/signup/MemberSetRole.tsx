import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SignupMemberSetRoleMale from "@pages/signup/components/MemberSetRoleMale";
import SignupMemberSetRoleFemale from "@pages/signup/components/MemberSetRoleFemale";
import { useMemberStore } from "@store/useMemberStore";
import { getMyDataApi } from "@api/member";
import { AxiosError, AxiosResponse } from "axios";
import { useFamilyStore } from "@store/useFamilyStore";

const SignupMemberSetRole = () => {
  const location = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    role,
    gender,
    setMemberImage,
    stringMemberImage,
    setStringMemberImage
  } = useMemberStore();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [icon, setIcon] = useState<string>("");

  // 역할이 바뀌면 에러메시지 초기화
  useEffect(() => {
    setErrorMessage("");
  }, [role]);

  // 초기에 사진 초기화
  useEffect(() => {
    setMemberImage(null);
    setStringMemberImage("");
  }, []);

  // 다음으로 가는 버튼
  const goToMemberSetCheck = () => {
    // 입력값 검증
    if (role && (role.length < 1 || role.length > 6 || !/^[가-힣]*$/.test(role))) {
      // 오류 메시지 설정
      setErrorMessage("한글로 1~6글자를 입력해주세요.");
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
      // 함수 실행 중단
      return;
    
    // 역할과 아이콘이 선택되었을 때
    } else {
      navigate("/signup/member-set/check", {
        state: {
          icon,
          previous: "member-set"
        }
      })
    }
  }

  return (
    <div className="signup-member-set-role slide-in">

      {/*역할과 아이콘*/}
      <div className="signup-member-set-role__choice">
        {gender === "male" ? (
          <SignupMemberSetRoleMale
            inputRef={inputRef}
            goToMemberSetCheck={goToMemberSetCheck}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setIcon={setIcon}
          />
        ) : (
          <SignupMemberSetRoleFemale
            inputRef={inputRef}
            goToMemberSetCheck={goToMemberSetCheck}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            setIcon={setIcon}
          />
        )}
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-role__btn">
        <button
          className="btn-next"
          onClick={goToMemberSetCheck}
          disabled={!stringMemberImage || !role}
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>

    </div>
  );
};

export default SignupMemberSetRole;