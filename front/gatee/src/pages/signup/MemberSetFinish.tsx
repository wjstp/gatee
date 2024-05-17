import React, { useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useMemberStore } from "@store/useMemberStore";
import wholeFamily from "@assets/images/profile/whole_family.png"
import base64 from "base-64";

const SignupMemberSetFinish = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from: string | null = location.state?.from;
  const accessToken: string | null = localStorage.getItem("accessToken");

  const { name } = useMemberStore();

  // from이 없다면 이동 막기
  useEffect(() => {
    if (!from) {
      if (accessToken) {
        const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
        const decode = base64.decode(payload);
        const json = JSON.parse(decode);

        if (json.authorities[0] === "ROLE_ROLE_USER") {
          alert(`잘못된 접근입니다.`);
          navigate(`/main`);
        } else {
          alert(`잘못된 접근입니다.`);
          navigate(`/kakao`);
        }
      }
    }
  }, []);

  // 메인으로 가기
  const goToMain = () => {
    navigate("/main");
  }

  return (
    <div className="signup-member-set-finish slide-in">
      {/*제목*/}
      <div className="signup-member-set-finish__title">
        <div className="title__header">
          <span className="title__part--01">
            {name}
          </span>
          <span className="title__part--02">
            님,
          </span>
        </div>
        <div className="title__body">
          <span className="title__part--03">
            회원 가입을 축하합니다!
          </span>
        </div>
      </div>

      {/*그림*/}
      <div className="signup-member-set-finish__img">
        <img
          className="img"
          src={wholeFamily}
          alt="whole-family"
        />
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-finish__btn">
        <button
          className="btn-next"
          onClick={goToMain}
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>
    </div>
  );
};

export default SignupMemberSetFinish;