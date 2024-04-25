import React from 'react';
import { BiCopy } from "react-icons/bi";

function FamilyShareCode() {
  return (
    <div className="familyShareCode">
      <div className="familyShareCode__textBox">
        <span className="familyShareCode__textBox__text1">가족을 초대</span>
        <span className="familyShareCode__textBox__text2">해봐요</span>
      </div>
      <div className="familyShareCode__imageBox">
        <img
          className="familyShareCode__imageBox__image"
          src=""
          alt=""
        />
      </div>
      <div className="familyShareCode__nameBox">
        <span className="familyShareCode__nameBox__name">예삐네 가족</span>
      </div>
      <div className="familyShareCode__codeSection">
        <div className="familyShareCode__codeSection__textBox">
          <span className="familyShareCode__codeSection__textBox__text">
            초대 코드
          </span>
        </div>
        <div className="familyShareCode__codeSection__codeBox">
          <span className="familyShareCode__codeSection__codeBox__code">
            A43959FE
          </span>
        </div>
        <div className="familyShareCode__codeSection__iconBox">
          <BiCopy className="familyShareCode__codeSection__iconBox__icon"/>
        </div>
      </div>
      <div className="familyShareCode__kakaoButtonBox">
        <button
          className="familyShareCode__kakaoButtonBox__kakaoButton"
        >
          KaKao
        </button>
      </div>
      <div className="familyShareCode__nextButtonBox">
        <button
          className="signupButton"
        >
          다음
        </button>
      </div>
    </div>
  );
}

export default FamilyShareCode;