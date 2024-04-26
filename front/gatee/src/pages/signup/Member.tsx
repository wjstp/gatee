import React from 'react';
import {useLocation} from "react-router-dom";
import MemberSetName from "./component/MemberSetName";
import MemberSetBirth from "./component/MemberSetBirth";
import MemberSetRole from "./component/MemberSetRole";
import MemberCheckInfo from "./component/MemberCheckInfo";
import MemberCheckPermission from "./component/MemberCheckPermission";

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