import React, {useState, useRef} from 'react';
import {Link} from 'react-router-dom';

function FamilyJoin() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [inputCode, setInputCode] = useState('');
  
  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value.toUpperCase();
    setInputCode(value);
  }
  
  // 입력하기 버튼 클릭 처리
  const handleEnterClick = (): void => {
    // 입력값이 8글자의 대문자 영어와 숫자로 구성되어 있는지 확인
    if (inputCode.length !== 8 || !/^[A-Z0-9]*$/.test(inputCode)) { // 조건을 올바르게 수정했습니다.
      alert('8글자의 대문자 영어와 숫자만 입력해주세요.');
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
    // 검증 통과시 가족 조회
    } else {
      setIsCodeEntered(true);
    }
  };
  
  // 코드 입력으로 이동
  const handleExit = (): void => {
    setIsCodeEntered(false);
  }

  return (
    <div className="familyJoin">
      {!isCodeEntered ? (
        // 코드 입력 전
        <div className="familyJoin__codeInput">

          {/* 코드 입력 문구 */}
          <div className="familyJoin__codeInput__spanBox">
          <span className="familyJoin__codeInput__spanBox__span1">
            가족코드를 입력
          </span>
            <span className="familyJoin__codeInput__spanBox__span2">
            해 주세요
          </span>
          </div>

          {/* 코드 입력창 */}
          <div className="familyJoin__codeInput__inputBox">
            <input
              className="familyJoin__codeInput__inputBox__input"
              ref={inputRef}
              type="text"
              pattern="[가-힣]*"
              placeholder="EX) A43959FE "
              value={inputCode}
              onChange={handleInputChange}
              autoFocus
            />
          </div>

          {/* 입력하기 버튼 */}
          <div className="familyJoin__codeInput__inputButtonBox">
            <button
              className="familyJoin__codeInput__inputButtonBox__inputButton"
              onClick={handleEnterClick}
            >
            <span className="familyJoin__codeInput__inputButtonBox__inputButton__span">
              입력하기
            </span>
            </button>
          </div>
        </div>
        
      ) : (
        // 코드 입력 후
        <div className="familyJoin__codeResult">

          {/* 가족 이미지 */}
          <div className="familyJoin__codeResult__imageBox">
            <img
              className="familyJoin__codeResult__imageBox__image"
              src=""
              alt=""
            />
          </div>

          {/* 가족 이름 */}
          <div className="familyJoin__codeResult__nameBox">
            <span className="familyJoin__codeResult__nameBox__name">예삐네 가족</span>
          </div>

          {/* 가족 입장 및 회원정보 등록 */}
          <div className="familyJoin__codeResult__joinFamilyButtonBox">
            <Link
              className="familyJoin__codeResult__joinFamilyButtonBox__joinFamilyButton"
              to="/signup/member"
              state={{
                action: 'set-name',
              }}
            >
            <span className="familyJoin__codeResult__joinFamilyButtonBox__joinFamilyButton__span">
              입장하기
            </span>
            </Link>
          </div>

          {/* 코드 입력 페이지로 이동 버튼 */}
          <div className="familyJoin__codeResult__backButtonBox">
            <button
              className="familyJoin__codeResult__backButtonBox__backButton"
              onClick={handleExit}
            >
            <span className="familyJoin__codeResult__backButtonBox__backButton__span">
              우리 가족이 아니에요
            </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FamilyJoin;