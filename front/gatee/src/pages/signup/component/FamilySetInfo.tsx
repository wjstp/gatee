import React, {useRef, useState} from 'react';
import { IoIosCamera } from "react-icons/io";
import {Link, useNavigate} from "react-router-dom";

const FamilySetInfo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);

  // 입력값
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setInputValue(value);
  }

  // 다음 버튼 클릭 처리
  const handleNextButtonClick = (): void => {
    // 입력값이 1 ~ 6글자 이하의 한글로만 구성되어 있는지 확인
    if (inputValue.length < 1 || inputValue.length > 6 || !/^[가-힣]*$/.test(inputValue)) {
      alert('1 ~ 6글자 이하의 한글만 입력해주세요.');
      // 재포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
    // 검증 통과시 정보 확인
    } else {
      setIsNameEntered(true);
    }
  }

  // 이름 입력으로 이동
  const handleExit = ():void => {
    navigate(-1);
  }

  return (
    <div className="familySetInfo">
      {!isNameEntered ? (
        // 이름 입력 전
        <div className="familySetInfo__nameInput">

          {/* 가족 소개 문구 */}
          <div className="familySetInfo__nameInput__spanBox">
            <span className="familySetInfo__nameInput__spanBox__span1">가족을 소개</span>
            <span className="familySetInfo__nameInput__spanBox__span2">해 주세요</span>
          </div>

          {/* 가족 이미지 */}
          <div className="familySetInfo__nameInput__imageBox">
            <img
              className="familySetInfo__nameInput__imageBox__image"
              src=""
              alt=""
            />
            {/* 가족 이미지 수정 버튼 */}
            <div className="familySetInfo__nameInput__imageBox__changeButtonBox">
              <button className="familySetInfo__nameInput__imageBox__changeButtonBox__changeButton">
                <IoIosCamera
                  className="familySetInfo__nameInput__imageBox__changeButtonBox__changeButton__icon"
                  size={29}
                />
              </button>
            </div>
          </div>

          {/* 가족 이름 입력창 */}
          <div className="familySetInfo__nameInput__inputBox">
            <input
              className="familySetInfo__nameInput__inputBox__input"
              ref={inputRef}
              type="text"
              pattern="[가-힣]*"
              placeholder="OO이네 가족"
              value={inputValue}
              onChange={handleInputChange}
              autoFocus
            />
          </div>

          {/* 가족 소개 버튼 */}
          <div className="familySetInfo__nameInput__nextButtonBox">
            <button
              className="familySetInfo__nameInput__nextButtonBox__nextButton"
              onClick={handleNextButtonClick}
            >
              <span className="familySetInfo__nameInput__nextButtonBox__nextButton__span">
                다음
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="familySetInfo__nameResult">
          <div className="familyCheckInfo">
            {/* 가족 확인 문구*/}
            <div className="familyCheckInfo__spanBox">
        <span className="familyCheckInfo__spanBox__span1">
          이렇게 소개
        </span>
              <span className="familyCheckInfo__spanBox__span2">
          할까요?
        </span>
            </div>

            {/* 가족 이미지 */}
            <div className="familyCheckInfo__imageBox">
              <img
                className="familyCheckInfo__imageBox__image"
                src=""
                alt=""
              />
            </div>

            {/* 가족 이름 */}
            <div className="familyCheckInfo__nameBox">
              <span className="familyCheckInfo__nameBox__name">{inputValue}</span>
            </div>

            {/* 가족 소개 버튼 */}
            <div className="familyCheckInfo__createFamilyButtonBox">
              <Link
                className="familyCheckInfo__createFamilyButtonBox__createFamilyButton"
                to="/signup/family"
                state={{
                  action: 'share-code',
                }}
              >
          <span className="familyCheckInfo__createFamilyButtonBox__createFamilyButton__span">
            소개하기
          </span>
              </Link>
            </div>

            {/* 뒤로 가기 버튼 */}
            <div className="familyCheckInfo__backButtonBox">
              <button
                className="familyCheckInfo__backButtonBox__backButton"
                onClick={handleExit}
              >
          <span className="familyCheckInfo__backButtonBox__backButton__span">
            다르게 소개할래요
          </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FamilySetInfo;