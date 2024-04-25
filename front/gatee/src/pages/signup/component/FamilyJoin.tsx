import React, {useState} from 'react';

function FamilyJoin() {
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEnter = (): void => {
    setIsCodeEntered(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    setInputValue(value);
  }

return (
  <div className="familyJoin">
    {!isCodeEntered ? (
      <div className="familyJoin__codeInput">
        <div className="familyJoin__codeInput__textBox">
          <span className="familyJoin__codeInput__textBox__text1">
            가족코드를 입력
          </span>
          <span className="familyJoin__codeInput__textBox__text2">
            해주세요
          </span>
        </div>
        <div className="familyJoin__codeInput__inputBox">
          <input
            className="familyJoin__codeInput__inputBox__input"
            type="text"
            pattern="[가-힣]*"
            placeholder="EX) A43959FE "
            value={inputValue}
            onChange={handleInputChange}
            autoFocus
          />
        </div>
        <div className="familyJoin__codeInput__inputButtonBox">
          <button
            className="familyJoin__codeInput__inputButtonBox__inputButton"
            onClick={handleEnter}
          >
            입력하기
          </button>
        </div>
      </div>
    ) : (
      <div className="familyJoin__codeResult">
        <div className="familyJoin__codeResult__imageBox">
          <img
            className="familyJoin__codeResult__imageBox__image"
            src=""
            alt=""
          />
        </div>
        <div className="familyJoin__codeResult__nameBox">
          <span className="familyJoin__codeResult__nameBox__name">예삐네 가족</span>
        </div>
        <div className="familyJoin__codeResult__inputButtonBox">
          <button
            className="familyJoin__codeResult__inputButtonBox__inputButton"
          >
            입장하기
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default FamilyJoin;