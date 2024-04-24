import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import { ReactComponent as CameraIcon } from "assets/icons/camera.svg";

function FamilySetInfo() {
  const navigate = useNavigate();

  const goToFamilyShareCode = (): void => {
    navigate('/signup/family', { state: { action: 'share-code' }});
  }

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setInputValue(value);
  }

  return (
    <div className="familySetInfo">
      <div className="familySetInfo__textBox">
        <span className="familySetInfo__textBox__text1">가족을 소개</span>
        <span className="familySetInfo__textBox__text2">해주세요</span>
      </div>
      <div className="familySetInfo__imageBox">
        <img
          className="familySetInfo__imageBox__image"
          src=""
          alt=""
        />
        <div className="familySetInfo__imageBox__changeButtonBox">
          <button className="familySetInfo__imageBox__changeButtonBox__changeButton">
            <CameraIcon
              className="familySetInfo__imageBox__changeButtonBox__changeButton__icon"
            />
          </button>
        </div>
      </div>
      <div className="familySetInfo__inputBox">
        <input
          className="familySetInfo__inputBox__input"
          type="text"
          pattern="[가-힣]*"
          placeholder="OO이네 가족"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div className="familySetInfo__nextButtonBox">
        <button
          className="signupButton"
          onClick={goToFamilyShareCode}
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default FamilySetInfo;