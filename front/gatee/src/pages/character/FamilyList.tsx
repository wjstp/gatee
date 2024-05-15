import React from 'react';
import {useFamilyStore} from "@store/useFamilyStore";
import {Link} from "react-router-dom";
import BookIcon from "@assets/images/icon3D/dictionary.png";

const CharacterFamilyList = () => {
  const {familyInfo, familyName} = useFamilyStore()
  return (
    <div className="character-family-list">
      <h1 className="character-family-list-title">{familyName}의 서재</h1>

      <div className="character-family-list-container">
        {familyInfo.map((member,index) => {
          return (
            <Link to={`${member.memberFamilyId}`} key={index}
                  className="character-family-list-item-container">
              <div className="icon-and-name-container">
                <img src={BookIcon} width={50} alt=""/>
                <p className="character-family-list-item-name"><strong>{member.nickname}</strong> 사전</p>
              </div>
              <button className="go-to-dict-btn">보러가기</button>
            </Link>
          )
        })}
        <Link to="/character/question"
              className="go-to-question">
          내 사전 작성하기
        </Link>
      </div>
    </div>
  );
};

export default CharacterFamilyList;