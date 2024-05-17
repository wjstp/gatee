import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useMemberStore } from "@store/useMemberStore";
import base64 from "base-64";
import { useFamilyStore } from "@store/useFamilyStore";

const SignupMemberSet = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { name, setName } = useMemberStore();
  const { familyName } = useFamilyStore();

  const [errorMessage, setErrorMessage] = useState<string>("");

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
        }
      }
    }
  }, []);

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 6) {
      setName(value);
      setErrorMessage("");
    }
  }

  // 다음 버튼 클릭 처리
  const goToMemberSetBirth = () => {
    // 입력값 검증
    if (name?.length < 1 || name?.length > 6 || !/^[가-힣]*$/.test(name)) {
      // 오류 메시지 설정
      setErrorMessage("한글로 1~8글자를 입력해주세요.");
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
      return; // 함수 실행 중단
    } else {
      navigate("/signup/member-set/birth");
    }
  }

  return (
    <div className="signup-member-set slide-in">

      {/*제목*/}
      <div className="signup-member-set__title">
        <span className="title__part--01">
          실명
        </span>
        <span className="title__part--02">
          을 입력해 주세요
        </span>
      </div>

      {/*이름 입력*/}
      <div className="signup-member-set__input-box">
        <input
          className="input-box__input"
          ref={inputRef}
          type="text"
          pattern="[가-힣]*"
          placeholder="예) 홍길동"
          value={name}
          onChange={handleInputChange}
          spellCheck={false}
        />
      </div>

      {/*에러 메시지*/}
      <div className="signup-member-set__error-message">
        {errorMessage ? (
          errorMessage
        ) : (
          "　"
        )}
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set__btn">
        <button
          className="btn-next"
          onClick={goToMemberSetBirth}
          disabled={!name}
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>

    </div>
  );
};

export default SignupMemberSet;