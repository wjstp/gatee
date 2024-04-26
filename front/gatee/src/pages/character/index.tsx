import React from 'react';
import DictionaryIcon from "@assets/Icon3D/dictionary.png"
import {useMemberStore} from "../../store/useMemberStore";
import Header from "@pages/character/component/Header";
import {Link} from "react-router-dom";

const CharacterIndex = () => {
  const {name} = useMemberStore()
  const isFirst = false
  return (
    <div className="character__index">
      <Header/>
      <h3>가족들에게 나를 알려 보아요</h3>
      <div className="explain">
        <p>다른 페이지로 가면 종료되며,</p>
        <p>답변은 다음 에 이어서 할 수 있어요.</p>
        <p>작성 내용은 <strong>가족 모의고사</strong>에서 활용해요</p>
      </div>
      <Link to="/character/question" className="orangeButtonLarge">백과사전 제작</Link>


    </div>
  );
};


export default CharacterIndex;