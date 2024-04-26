import React from 'react';
import Header from "@pages/character/component/Header";
import {Link} from "react-router-dom";

const CharacterIndex = () => {
  return (
    <div className="character__index">

      {/* 헤더 -> **의 백과사전 */}
      <Header/>

      {/* 설명 머릿말 */}
      <h3 className="character__index__explain__title">
        가족들에게 나를 알려 보아요
      </h3>

      {/* 설명 */}
      <div className="character__index__explain__content">
        <p>다른 페이지로 가면 종료되며,</p>
        <p>답변은 다음 에 이어서 할 수 있어요.</p>
        <p>작성 내용은 <strong>가족 모의고사</strong>에서 활용해요</p>
      </div>

      {/* 버튼 */}
      <Link to="/character/question"
            className="orangeButtonLarge">
            백과사전 제작
      </Link>

    </div>
  );
};


export default CharacterIndex;