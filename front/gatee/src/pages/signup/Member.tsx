import React from 'react';
import {useLocation} from "react-router-dom";
import MemberSetName from "./component/MemberSetName";
import MemberSetBirth from "./component/MemberSetBirth";
import MemberSetRole from "./component/MemberSetRole";
import MemberCheckInfo from "./component/MemberCheckInfo";
import MemberCheckPermission from "./component/MemberCheckPermission";

const SignupMember = () => {
  const location = useLocation();
  const action = location.state?.action;

  return (
    <div className="signupMember">
      {action === 'set-name' ? (
        // 이름 설정
        <MemberSetName />

      ) : action === 'set-birth' ? (
        // 생일 및 성별 설정
        <MemberSetBirth />

      ) : action === 'set-role' ? (
        // 역할 및 아이콘 설정
        <MemberSetRole />

      ) : action === 'check-info' ? (
        // 정보 확인
        <MemberCheckInfo />

      ) : action === 'check-permission' ? (
        // 약관 설정
        <MemberCheckPermission />

      ) : (
        // 잘못된 경로
        <div className="signupMember__div">
            <span className="signupMember__div__span">
              이쪽은 잘못된 방향이에요!
            </span>
        </div>
      )}
    </div>
  );
}

export default SignupMember;