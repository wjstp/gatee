import React from 'react';
import SignupMemberSetRoleEtc from "@pages/signup/components/MemberSetRoleEtc";
import { ReactComponent as Kid } from "@assets/images/signup/daughter.svg";
import { ReactComponent as Young } from "@assets/images/signup/mom.svg";
import { ReactComponent as Old } from "@assets/images/signup/grandma.svg";

const SignupMemberSetRoleFemale = (props: {
  gender: string
  selectedRole: string
  setSelectedRole: (selectedRole: string) => void;
  selectedIcon: string
  setSelectedIcon: (selectedIcon: string) => void;
  inputRole: string
  setInputRole: (inputRole: string) => void;
}) => {
  const { gender, selectedRole, setSelectedRole, selectedIcon, setSelectedIcon, inputRole, setInputRole } = props;
  console.log(selectedRole)
  return (
    <div className="signup-member-set-role-female">
      {/*역할 제목*/}
      <div className="signup-member-set-role-female__title-role">
        <span className="title__part--01">
          나의 역할
        </span>
        <span className="title__part--02">
          을 알려주세요
        </span>
      </div>

      {/*역할*/}
      <div className="signup-member-set-role-female__role">
        <button
          className={selectedRole === "mom" ? "btn-mom--selected" : "btn-mom"}
          onClick={() => setSelectedRole("mom")}
        >
          <span className="btn-mom--text">
            엄마
          </span>
        </button>
        <button
          className={selectedRole === "daughter" ? "btn-daughter--selected" : "btn-daughter"}
          onClick={() => setSelectedRole("daughter")}
        >
          <span className="btn-daughter--text">
            딸
          </span>
        </button>
        <button
          className={selectedRole === "etc" ? "btn-etc--selected" : "btn-etc"}
          onClick={() => setSelectedRole("etc")}
        >
          <span className="btn-etc--text">
            기타
          </span>
        </button>
      </div>
      
      {/*역할 기타 선택*/}
      <div className="signup-member-set-role-female__role-etc">
        {selectedRole === "etc" ? (
          <SignupMemberSetRoleEtc
            gender={gender}
            inputRole={inputRole}
            setInputRole={setInputRole}
          />
        ) : (
          null
        )}
      </div>

      {/*아이콘 제목*/}
      <div className="signup-member-set-role-female__title-icon">
        <span className="title__part--01">
          아이콘
        </span>
        <span className="title__part--02">
          을 선택해주세요
        </span>
      </div>

      {/*아이콘*/}
      <div className="signup-member-set-role-female__icon">
        <div className="icon-box">
          <button
            className={selectedIcon === "kid" ? "icon-box__btn-kid--selected" : "icon-box__btn-kid"}
            onClick={() => setSelectedIcon("kid")}
          >
            <Kid
              className={selectedIcon === "kid" ? "btn-kid--icon--selected" : "btn-kid--icon"}
            />
          </button>
          <button
            className={selectedIcon === "young" ? "icon-box__btn-young--selected" : "icon-box__btn-young"}
            onClick={() => setSelectedIcon("young")}
          >
            <Young
              className={selectedIcon === "young" ? "btn-young--icon--selected" : "btn-young--icon"}
            />
          </button>
          <button
            className={selectedIcon === "old" ? "icon-box__btn-old--selected" : "icon-box__btn-old"}
            onClick={() => setSelectedIcon("old")}
          >
            <Old
              className={selectedIcon === "old" ? "btn-old--icon--selected" : "btn-old--icon"}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupMemberSetRoleFemale;