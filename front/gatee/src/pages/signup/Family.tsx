import React from 'react';
import {useLocation} from "react-router-dom";
import FamilySetInfo from "./component/FamilySetInfo";
import FamilyJoin from "./component/FamilyJoin";
import FamilyShareCode from "./component/FamilyShareCode";

function SignupFamily() {
  const location = useLocation();
  const action = location.state?.action;

  return (
    <div className="signupFamily">
      <div className="signupFamily__div">
        {action === 'set-info' ? (
          <FamilySetInfo />
        ) : action === 'join' ? (
          <FamilyJoin />
        ) : action === 'share-code' ? (
          <FamilyShareCode />
        ) : (
          <div className="signupFamily__div__div">
            <span className="signupFamily_div__div__span">
              잘못된 접근입니다.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignupFamily;