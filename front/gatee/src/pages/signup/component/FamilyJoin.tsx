import React, {useState} from 'react';

function FamilyJoin() {
  const [isCodeEntered, setIsCodeEntered] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleEnter = (): void => {
    setIsCodeEntered(true);
  };

  const handleExit = (): void => {
    setIsCodeEntered(false);
  }

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
        <div>
          <img src="" alt=""/>
        </div>
        <div>
          <span>OO이네 가족</span>
        </div>
        <div>
          <button>
            입장하기
          </button>
        </div>
        <div>
          <button
            onClick={handleExit}
          >
            우리 가족이 아니에요..
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default FamilyJoin;