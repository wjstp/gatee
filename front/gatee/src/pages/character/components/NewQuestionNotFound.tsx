import React from 'react';

const NewQuestionNotFound = () => {
  return (
    <div className="new-question-not-found-container">
      <p className="new-question-not-found-title">모든 질문을 대답했어요.</p>
      <p className="new-question-not-found-explain">업데이트를 기다려주세요!</p>
    </div>
  );
};

export default NewQuestionNotFound;