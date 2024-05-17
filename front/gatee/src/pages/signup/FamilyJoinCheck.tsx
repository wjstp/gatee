import React, {useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "@store/useFamilyStore";
import { joinFamilyApi } from "@api/member";
import { AxiosError, AxiosResponse } from "axios";
import base64 from "base-64";

const SignupFamilyJoinCheck = () => {
  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { familyCode, stringImage, familyName, familyId } = useFamilyStore();

  // 권한에 따라 redirect
  useEffect(() => {
    if (accessToken) {
      const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
      const decode = base64.decode(payload);
      const json = JSON.parse(decode);

      if (json.authorities[0] === "ROLE_ROLE_USER") {
        alert(`잘못된 접근입니다.`);
        navigate(`/main`);
      } else {
        if (!familyCode) {
          alert(`먼저 코드를 입력해 주세요!`)
          navigate(`/signup/family-join`);
        }
      }
    }
  }, []);

  // 다음으로 넘어가기
  const goToMemberSet = () => {
    navigate("/signup/member-set")
  }

  // 뒤로 가기
  const backTo = () => {
    navigate(-1);
  }

  return (
    <div className="signup-family-join-check slide-in">
      {/*가족 이미지*/}
      <div className="signup-family-join-check__img">
        <img
          className="img"
          src={stringImage}
          alt="family-image"
        />
      </div>

      {/*가족 이름*/}
      <div className="signup-family-join-check__name">
        <span className="name">
          {familyName}
        </span>
      </div>

      <div className="signup-family-join-check__btn">
        {/*회원 등록 버튼*/}
        <button
          className="btn-join-member"
          onClick={goToMemberSet}
        >
          <span className="btn-join-member__text">
            입장하기
          </span>
        </button>
        <button
          className="btn-back"
          onClick={backTo}
        >
          <span className="btn-back__text">
            우리 가족이 아니에요
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignupFamilyJoinCheck;