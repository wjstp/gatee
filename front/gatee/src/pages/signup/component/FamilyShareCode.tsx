import React from 'react';
import { BiCopy } from "react-icons/bi";
import {useLocation, Link} from "react-router-dom";

const FamilyShareCode = () => {
  const location = useLocation();
  const inputValue = location.state?.inputValue;

  return (
    <div className="familyShareCode">
      {/* 가족 초대 문구 */}
      <div className="familyShareCode__spanBox">
        <span className="familyShareCode__spanBox__span1">가족을 초대</span>
        <span className="familyShareCode__spanBox__span2">해 봐요</span>
      </div>

      {/* 가족 이미지 */}
      <div className="familyShareCode__imageBox">
        <img
          className="familyShareCode__imageBox__image"
          src=""
          alt=""
        />
      </div>

      {/* 가족 이름 */}
      <div className="familyShareCode__nameBox">
        <span className="familyShareCode__nameBox__name">
          {inputValue}
        </span>
      </div>

      {/* 코드 섹션 */}
      <div className="familyShareCode__codeSection">
        {/* 코드 문구 */}
        <div className="familyShareCode__codeSection__spanBox">
          <span className="familyShareCode__codeSection__spanBox__span">
            초대 코드
          </span>
        </div>
        {/* 코드 */}
        <div className="familyShareCode__codeSection__codeBox">
          <span className="familyShareCode__codeSection__codeBox__code">
            A43959FE
          </span>
        </div>
        {/* 복사 버튼 */}
        <div className="familyShareCode__codeSection__copyButtonBox">
          <button className="familyShareCode__codeSection__copyButtonBox__copyButton">
            <BiCopy
              className="familyShareCode__codeSection__copyButtonBox__copyButton__icon"
              size={24}
            />
          </button>
        </div>
      </div>

      {/* 카카오톡 공유하기 버튼 */}
      <div className="familyShareCode__kakaoButtonBox">
        <button
          className="familyShareCode__kakaoButtonBox__kakaoButton"
        >
          KaKao
        </button>
      </div>

      {/* 다음 버튼 */}
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