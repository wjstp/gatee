import React from 'react';

const MemberSetName = () => {
  return (
    <div className="memberSetName">
      <div className="memberSetName__textBox">
        <span className="memberSetName__textBox__text1">
          이름
        </span>
        <span className="memberSetName__textBox__text2">
          을 입력해 주세요
        </span>
      </div>
      <div className="memberSetName__inputBox">
        <input
          className="memberSetName__inputBox__input"
          type="text"
        />
      </div>
      <div className="memberSetName__nextButtonBox">
        <button className="memberSetName__nextButtonBox__nextButton">
          <span className="memberSetName__nextButtonBox__nextButton__text">
            다음
          </span>
        </button>
      </div>
    </div>
  );
}

export default MemberSetName;