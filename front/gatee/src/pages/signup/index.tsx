import React from 'react';
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "@assets/image/icons/home.svg"

function SignupIndex() {
  return (
    <div className="signupIndex">
      <div className="signupIndex__iconBox">
        <HomeIcon className="signupIndex__iconBox__icon" />
      </div>
      <div className="signupIndex__spanBox">
        <span className="signupIndex__spanBox__span1">가족에게</span>
        <span className="signupIndex__spanBox__span2">한발짝</span>
        <span className="signupIndex__spanBox__span3">다가가 볼까요?</span>
      </div>
      <div className="signupIndex__createButtonBox">
        <Link
          className="signupIndex__createButtonBox__createButton"
          to="/signup/family"
          state={{ action: 'set-info' }}
        >
          <span className="signupIndex__createButtonBox__createButton__span">
            내 가족 생성하기
          </span>
        </Link>
      </div>
      <div className="signupIndex__joinButtonBox">
        <Link
          className="signupIndex__joinButtonBox__joinButton"
          to="/signup/family"
          state={{ action: 'join' }}
        >
          <span className="signupIndex__joinButtonBox__joinButton__span">
            초대 코드 입력
          </span>
        </Link>
      </div>
    </div>
  );
}

export default SignupIndex;