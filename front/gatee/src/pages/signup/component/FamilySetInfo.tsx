import React, {useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {PiCamera} from "react-icons/pi";
import FamilySetCheckModal from "./FamilySetCheckModal";

function FamilySetInfo() {
  const [inputValue, setInputValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setInputValue(value);
  }

  const handleNextButtonClick = (): void => {
    // 입력값이 1 ~ 6글자 이하의 한글로만 구성되어 있는지 확인
    if (inputValue.length < 1 || inputValue.length > 6 || !/^[가-힣]*$/.test(inputValue)) {
      alert('1 ~ 6글자 이하의 한글만 입력해주세요.');
      // 재 포커싱
      if (inputRef.current) {
        inputRef.current.focus();
      }
    } else {
      setIsModalOpen(true);
    }
  }

  // const handleNextButtonClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
  //   // 입력값이 1 ~ 6글자 이하의 한글로만 구성되어 있는지 확인
  //   if (inputValue.length < 1 || inputValue.length > 6 || !/^[가-힣]*$/.test(inputValue)) {
  //     alert('1 ~ 6글자 이하의 한글만 입력해주세요.');
  //     // 이동 막기
  //     e.preventDefault();
  //     // 재 포커싱
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //     }
  //   } else {
  //     setIsModalOpen(true);
  //   }
  // }

  return (
    <div className="familySetInfo">
      <div className="familySetInfo__spanBox">
        <span className="familySetInfo__spanBox__span1">가족을 소개</span>
        <span className="familySetInfo__spanBox__span2">해주세요</span>
      </div>
      <div className="familySetInfo__imageBox">
        <img
          className="familySetInfo__imageBox__image"
          src=""
          alt=""
        />
        <div className="familySetInfo__imageBox__changeButtonBox">
          <button className="familySetInfo__imageBox__changeButtonBox__changeButton">
            <PiCamera
              className="familySetInfo__imageBox__changeButtonBox__changeButton__icon"
              size={27}
            />
          </button>
        </div>
      </div>
      <div className="familySetInfo__inputBox">
        <input
          className="familySetInfo__inputBox__input"
          ref={inputRef}
          type="text"
          pattern="[가-힣]*"
          placeholder="OO이네 가족"
          value={inputValue}
          onChange={handleInputChange}
          autoFocus
        />
      </div>
      <div className="familySetInfo__nextButtonBox">
        <button
          className="familySetInfo__nextButtonBox__nextButton"
          onClick={handleNextButtonClick}
        >
          <span className="familySetInfo__nextButtonBox__nextButton__span">
            소개하기
          </span>
        </button>
      </div>
      <FamilySetCheckModal
        isOpen={isModalOpen}
        inputValue={inputValue}
      />
    </div>
  );
}

export default FamilySetInfo;