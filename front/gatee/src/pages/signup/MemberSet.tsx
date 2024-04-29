import React, { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignupMemberSet = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [inputName, setInputName] = useState<string>('');

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setInputName(value);
  }

  const goToMemberSetBirth = () => {
    navigate("/signup/member-set/birth", {
      state: {
        inputName
      }
    });
  }

  return (
    <div className="signup-member-set">
      {/*제목*/}
      <div className="signup-member-set__title">
        <span className="title__part--01">
          이름
        </span>
        <span className="title__part--02">
          을 입력해 주세요
        </span>
      </div>

      {/* 코드 입력창 */}
      <div className="signup-member-set__input-box">
        <input
          className="input-box__input"
          ref={inputRef}
          type="text"
          pattern="[가-힣]*"
          placeholder="홍길동"
          value={inputName}
          onChange={handleInputChange}
          autoFocus
        />
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set__btn">
        <button
          className="btn-next"
          onClick={goToMemberSetBirth}
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