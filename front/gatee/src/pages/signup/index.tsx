import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as HomeIcon } from "@assets/images/icons/ic_home.svg"

const SignupIndex = () => {
  const navigate = useNavigate();

  // 만약 가족에 가입이 된적이 있다면
  useEffect(() => {

  }, []);

  // 약관 페이지로 이동
  const goToFamilyJoin = ():void => {
    navigate("/signup/permission");
  }

  // const getMyData

  return (
    <div className="signup-index">

      {/*홈 아이콘*/}
      <div className="signup-index__icon">
        <HomeIcon className="icon" />
      </div>

      {/*제목*/}
      <div className="signup-index__title">
        <span className="title__part--01">가족에게</span>
        <span className="title__part--02">한발짝</span>
        <span className="title__part--03">다가가 볼까요?</span>
      </div>

      {/*시작 링크*/}
      <div className="signup-index__btn">
        <button
          className="btn-family-join"
          onClick={goToFamilyJoin}
        >
          <span className="btn-family-join__text">
            시작하기
          </span>
        </button>
      </div>

    </div>
  );
}

export default SignupIndex;