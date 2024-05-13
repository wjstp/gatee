import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import SignupMemberSetRoleMale from "@pages/signup/components/MemberSetRoleMale";
import SignupMemberSetRoleFemale from "@pages/signup/components/MemberSetRoleFemale";
import { useMemberStore } from "@store/useMemberStore";
import { createMemberApi } from "@api/member";

const SignupMemberSetRole = () => {
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
      // 아이콘을 파일로 전환하여 페이지 넘기기
      convertURLToFile(
        stringMemberImage
      ).then((file: File) => {
        setMemberImage(file);
        navigate("/signup/member-set/check");
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  // URL을 받아서 File 객체로 변환하는 함수
  const convertURLToFile = async (imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    return new File([blob], "profile_image", { type: "image/jpeg" });
  }

  return (
    <div className="signup-member-set-role">

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