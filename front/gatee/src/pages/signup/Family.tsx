import React from 'react';
import {useLocation} from "react-router-dom";
import FamilySetInfo from "@pages/signup/components/FamilySetInfo";
import FamilyJoin from "@pages/signup/components/FamilyJoin";
import FamilyShareCode from "@pages/signup/components/FamilyShareCode";

function SignupFamily() {
  const location = useLocation();
  const action = location.state?.action;

  return (
    <div className="signupFamily">
      {action === 'set-info' ? (
        <FamilySetInfo />
      ) : action === 'join' ? (
        <FamilyJoin />
      ) : action === 'share-code' ? (
        <FamilyShareCode />
      ) : (
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