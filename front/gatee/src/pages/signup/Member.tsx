import React from 'react';
import {useLocation} from "react-router-dom";
import MemberSetName from "@pages/signup/components/MemberSetName";
import MemberSetBirth from "@pages/signup/components/MemberSetBirth";
import MemberSetRole from "@pages/signup/components/MemberSetRole";
import MemberCheckInfo from "@pages/signup/components/MemberCheckInfo";
import MemberCheckPermission from "@pages/signup/components/MemberCheckPermission";

function SignupMember() {
  const location = useLocation();
  const action = location.state?.action;

  return (
    <div className="signupMember">
      {action === 'set-name' ? (
        <MemberSetName />
      ) : action === 'set-birth' ? (
        <MemberSetBirth />
      ) : action === 'set-role' ? (
        <MemberSetRole />
      ) : action === 'check-info' ? (
        <MemberCheckInfo />
      ) : action === 'check-permission' ? (
        <MemberCheckPermission />
      ) : (
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