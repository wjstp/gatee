import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import SignupMemberSetRoleMale from "@pages/signup/components/MemberSetRoleMale";
import SignupMemberSetRoleFemale from "@pages/signup/components/MemberSetRoleFemale";

const SignupMemberSetRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputName = location.state?.inputName || "홍길동";
  const formattedDate = location.state?.formattedDate || "2024-04-05";
  const calendarType = location.state?.calendarType || "solar";
  const gender = location.state?.gender || "male";

  const [selectedRole, setSelectedRole] = useState(gender === 'male' ? "dad" : "mom");
  const [selectedIcon, setSelectedIcon] = useState("kid");

  const goToMemberSetCheck = () => {
    navigate("/signup/member-set/check", {
      state: {
        inputName,
        formattedDate,
        calendarType,
        gender,
        selectedRole,
        selectedIcon,
      }
    });
  }

  return (
    <div className="signup-member-set-role">
      {/*역할과 아이콘*/}
      <div className="signup-member-set-role__choice">
        {gender === "male" ? (
          <SignupMemberSetRoleMale
            gender={gender}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          />
        ) : (
          <SignupMemberSetRoleFemale
            gender={gender}
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedIcon={selectedIcon}
            setSelectedIcon={setSelectedIcon}
          />
        )}
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-role__btn">
        <button
          className="btn-next"
          onClick={goToMemberSetCheck}
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>
    </div>
  );
};

export default SignupMemberSetRole;