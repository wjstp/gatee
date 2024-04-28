import React from 'react';
import {useLocation} from "react-router-dom";
import FamilySetInfo from "./component/FamilySetInfo";
import FamilyJoin from "./component/FamilyJoin";
import FamilyShareCode from "./component/FamilyShareCode";
import FamilyCheckInfo from "./component/FamilyCheckInfo";

const SignupFamily = () => {
  const location = useLocation();
  const action = location.state?.action;

  return (
    <div className="signupFamily">
      {action === 'set-info' ? (
        // 가족 생성
        <FamilySetInfo />

      ) : action === 'join' ? (
        // 가족 코드 입장
        <FamilyJoin />

      ) : action === 'check-info' ? (
        // 가족 정보 확인
        <FamilyCheckInfo />

      ) : action === 'share-code' ? (
        // 가족 생성 후 코드 공유
        <FamilyShareCode />

      ) : (
        // 잘못된 경로
        <div className="signupFamily__div">
          <span className="signupFamily__div__span">
            이쪽은 잘못된 방향이에요!
          </span>
        </div>
      )}
    </div>
  );
}

export default SignupFamily;