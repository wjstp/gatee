import React, {useState} from 'react';

function FamilyJoin() {
const [isCodeEntered, setIsCodeEntered] = useState(false);

const handleEnter = (): void => {
  setIsCodeEntered(true);
};

const handleExit = (): void => {
  setIsCodeEntered(false);
}

return (
  <div className="familyJoin">
    {!isCodeEntered ? (
      <div className="familyJoin__inputCode">
        <div>
          <span>가족코드를 입력</span>
          <span>해주세요</span>
        </div>
        <div>
          <input type="text"/>
        </div>
        <div>
          <button
            onClick={handleEnter}
          >
            입력하기
          </button>
        </div>
      </div>
    ) : (
      <div className="familyJoin__checkFamily">
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