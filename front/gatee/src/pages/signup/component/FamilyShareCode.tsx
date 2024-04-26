import React from 'react';
import { BiCopy } from "react-icons/bi";
import {useLocation, Link} from "react-router-dom";

function FamilyShareCode() {
  const location = useLocation();
  const { inputValue, action } = location.state;

  return (
    <div className="familyShareCode">
      <div className="familyShareCode__spanBox">
        <span className="familyShareCode__spanBox__span1">가족을 초대</span>
        <span className="familyShareCode__spanBox__span2">해봐요</span>
      </div>
      <div className="familyShareCode__imageBox">
        <img
          className="familyShareCode__imageBox__image"
          src=""
          alt=""
        />
      </div>
      <div className="familyShareCode__nameBox">
        <span className="familyShareCode__nameBox__name">
          {inputValue}
        </span>
      </div>
      <div className="familyShareCode__codeSection">
        <div className="familyShareCode__codeSection__spanBox">
          <span className="familyShareCode__codeSection__spanBox__span">
            초대 코드
          </span>
        </div>
        <div className="familyShareCode__codeSection__codeBox">
          <span className="familyShareCode__codeSection__codeBox__code">
            A43959FE
          </span>
        </div>
        <div className="familyShareCode__codeSection__copyButtonBox">
          <button className="familyShareCode__codeSection__copyButtonBox__copyButton">
            <BiCopy
              className="familyShareCode__codeSection__copyButtonBox__copyButton__icon"
              size={24}
            />
          </button>
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
        <Link
          className="familyShareCode__nextButtonBox__nextButton"
          to="/signup/member"
          state={{
            action: 'set-name',
          }}
        >
          <span className="familyShareCode__nextButtonBox__nextButton__span">
            다음
          </span>
        </Link>
      </div>
    </div>
  );
}

export default FamilyShareCode;