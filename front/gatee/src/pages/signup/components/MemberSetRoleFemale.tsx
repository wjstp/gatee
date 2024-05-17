import React from 'react';
import SignupMemberSetRoleEtc from "@pages/signup/components/MemberSetRoleEtc";
import { ReactComponent as Girl1 } from "@assets/images/signup/profile_girl1.svg";
import { ReactComponent as Girl2 } from "@assets/images/signup/profile_girl2.svg";
import { ReactComponent as Woman1 } from "@assets/images/signup/profile_woman1.svg";
import { ReactComponent as Woman2 } from "@assets/images/signup/profile_woman2.svg";
import { ReactComponent as OldWoman } from "@assets/images/signup/profile_oldwoman.svg";
import girl1 from "@assets/images/signup/profile_girl1.svg";
import girl2 from "@assets/images/signup/profile_girl2.svg";
import woman1 from "@assets/images/signup/profile_woman1.svg";
import woman2 from "@assets/images/signup/profile_woman2.svg";
import oldWoman from "@assets/images/signup/profile_oldwoman.svg";
import { useMemberStore } from "@store/useMemberStore";

const SignupMemberSetRoleFemale = (props: {
  inputRef: React.RefObject<HTMLInputElement>;
  goToMemberSetCheck: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  setIcon: (icon: string) => void;
}) => {
  const { inputRef, goToMemberSetCheck, errorMessage, setErrorMessage, setIcon } = props;
  const { role, setRole, stringMemberImage, setStringMemberImage } = useMemberStore();

  return (
    <div className="signup-member-set-role-female">

      {/*역할 제목*/}
      <div className="signup-member-set-role-female__title-role">
        <span className="title__part--01">
          나의 역할
        </span>
        <span className="title__part--02">
          을 알려 주세요
        </span>
      </div>

      {/*역할*/}
      <div className="signup-member-set-role-female__role">
        <button
          className={role === "엄마" ? "btn-mom--selected" : "btn-mom"}
          onClick={() => setRole("엄마")}
        >
          <span className="btn-mom--text">
            엄마
          </span>
        </button>
        <button
          className={role === "딸" ? "btn-daughter--selected" : "btn-daughter"}
          onClick={() => setRole("딸")}
        >
          <span className="btn-daughter--text">
            딸
          </span>
        </button>
        <button
          className={role !== "엄마" && role !== "딸" && role !== null ? "btn-etc--selected" : "btn-etc"}
          onClick={() => setRole("")}
        >
          <span className="btn-etc--text">
            기타
          </span>
        </button>
      </div>

      {/*역할 기타 선택*/}
      <div className="signup-member-set-role-female__role-etc">
        {role !== "엄마" && role !== "딸" && role !== null ? (
          <SignupMemberSetRoleEtc
            inputRef={inputRef}
            goToMemberSetCheck={goToMemberSetCheck}
            setErrorMessage={setErrorMessage}
          />
        ) : (
          null
        )}
      </div>

      {/*에러 메시지*/}
      <div className="signup-member-set-role-female__error-message">
        {errorMessage ? (
          errorMessage
        ) : (
          '　'
        )}
      </div>

      {/*아이콘 제목*/}
      <div className="signup-member-set-role-female__title-icon">
        <span className="title__part--01">
          아이콘
        </span>
        <span className="title__part--02">
          을 선택해 주세요
        </span>
      </div>

      {/*아이콘*/}
      <div className="signup-member-set-role-female__icon">
        <div className="icon-box1">
          <button
            className={stringMemberImage === girl1 ? "icon-box__btn-kid--selected" : "icon-box__btn-kid"}
            onClick={() => {
              setStringMemberImage(girl1);
              setIcon("girl1");
            }}
          >
            <Girl1
              className={stringMemberImage === girl1 ? "btn-kid--icon--selected" : "btn-kid--icon"}
            />
          </button>
          <button
            className={stringMemberImage === woman1 ? "icon-box__btn-young--selected" : "icon-box__btn-young"}
            onClick={() => {
              setStringMemberImage(woman1);
              setIcon("woman1");
            }}
          >
            <Woman1
              className={stringMemberImage === woman1 ? "btn-young--icon--selected" : "btn-young--icon"}
            />
          </button>
          <button
            className={stringMemberImage === oldWoman ? "icon-box__btn-old--selected" : "icon-box__btn-old"}
            onClick={() => {
              setStringMemberImage(oldWoman);
              setIcon("oldwoman");
            }}
          >
            <OldWoman
              className={stringMemberImage === oldWoman ? "btn-old--icon--selected" : "btn-old--icon"}
            />
          </button>
        </div>
        <div className="icon-box2">
          <button
            className={stringMemberImage === girl2 ? "icon-box__btn-kid--selected" : "icon-box__btn-kid"}
            onClick={() => {
              setStringMemberImage(girl2);
              setIcon("girl2");
            }}
          >
            <Girl2
              className={stringMemberImage === girl2 ? "btn-kid--icon--selected" : "btn-kid--icon"}
            />
          </button>
          <button
            className={stringMemberImage === woman2 ? "icon-box__btn-young--selected" : "icon-box__btn-young"}
            onClick={() => {
              setStringMemberImage(woman2);
              setIcon("woman2");
            }}
          >
            <Woman2
              className={stringMemberImage === woman2 ? "btn-young--icon--selected" : "btn-young--icon"}
            />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SignupMemberSetRoleFemale;