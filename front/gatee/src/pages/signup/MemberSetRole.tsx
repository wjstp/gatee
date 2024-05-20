import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SignupMemberSetRoleMale from "@pages/signup/components/MemberSetRoleMale";
import SignupMemberSetRoleFemale from "@pages/signup/components/MemberSetRoleFemale";
import { useMemberStore } from "@store/useMemberStore";
import base64 from "base-64";
import { useFamilyStore } from "@store/useFamilyStore";

const SignupMemberSetRole = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { familyName } = useFamilyStore();
  const {
    name,
    birth,
    role,
    gender,
    setMemberImage,
    stringMemberImage,
    setStringMemberImage
  } = useMemberStore();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [icon, setIcon] = useState<string>("");

  // 초기에 사진 초기화
  useEffect(() => {
    setMemberImage(null);
    setStringMemberImage("");

    // 권한에 따라 redirect
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
            }
          }
        }
      }
    }
  }, []);

  // 역할이 바뀌면 에러메시지 초기화
  useEffect(() => {
    setErrorMessage("");
  }, [role]);


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
          icon
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