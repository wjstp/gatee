import React from 'react';
import {Link, useNavigate, useLocation} from "react-router-dom";

const FamilyCheckInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputValue = location.state?.inputValue || '';
  
  // 뒤로 가기 버튼 처리
  const handleBack = (): void => {
    navigate(-1);
  }

  return (
    <div className="familyCheckInfo">
      {/* 가족 확인 문구*/}
      <div className="familyCheckInfo__spanBox">
        <span className="familyCheckInfo__spanBox__span1">
          이렇게 소개
        </span>
        <span className="familyCheckInfo__spanBox__span2">
          할까요?
        </span>
      </div>

      {/* 가족 이미지 */}
      <div className="familyCheckInfo__imageBox">
        <img
          className="familyCheckInfo__imageBox__image"
          src=""
          alt=""
        />
      </div>

      {/* 가족 이름 */}
      <div className="familyCheckInfo__nameBox">
        <span className="familyCheckInfo__nameBox__name">{inputValue}</span>
      </div>

      {/* 가족 소개 버튼 */}
      <div className="familyCheckInfo__createFamilyButtonBox">
        <Link
          className="familyCheckInfo__createFamilyButtonBox__createFamilyButton"
          to="/signup/family"
          state={{
            action: 'share-code',
          }}
        >
          <span className="familyCheckInfo__createFamilyButtonBox__createFamilyButton__span">
            소개하기
          </span>
        </Link>
      </div>

      {/* 뒤로 가기 버튼 */}
      <div className="familyCheckInfo__backButtonBox">
        <button
          className="familyCheckInfo__backButtonBox__backButton"
          onClick={handleBack}
        >
          <span className="familyCheckInfo__backButtonBox__backButton__span">
            다르게 소개할래요
          </span>
        </button>
      </div>
    </div>
  );
};

export default FamilyCheckInfo;