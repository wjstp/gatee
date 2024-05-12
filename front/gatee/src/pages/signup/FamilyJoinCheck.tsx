import React from 'react';
import { useNavigate } from "react-router-dom";
import { useFamilyStore } from "@store/useFamilyStore";
import { joinFamilyApi } from "@api/member";
import { AxiosError, AxiosResponse } from "axios";

const SignupFamilyJoinCheck = () => {
  const navigate = useNavigate();
  const { familyCode, stringImage, familyName, familyId } = useFamilyStore();

  const goToMemberSet = () => {
    navigate("/signup/member-set");
  }

  const backTo = () => {
    navigate(-1);
  }

  // // 가족 합류 api
  // const joinFamily = () => {
  //   joinFamilyApi(
  //     {
  //       familyCode: code
  //     },
  //     (res: AxiosResponse<any>) => {
  //       console.log(res);
  //       navigate("/signup/family-join/check")
  //     },
  //     (err: AxiosError<any>) => {
  //       console.log(err);
  //       alert("잘못된 코드입니다!");
  //       navigate("/signup/family-join");
  //     }
  //   )
  // }

  return (
    <div className="signup-family-join-check">
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
        <span className="name">{familyName}</span>
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