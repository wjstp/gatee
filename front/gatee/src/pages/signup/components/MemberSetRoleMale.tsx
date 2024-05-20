import React from 'react';
import SignupMemberSetRoleEtc from "@pages/signup/components/MemberSetRoleEtc";
import { ReactComponent as Boy1 } from "@assets/images/signup/profile_boy1.svg";
import { ReactComponent as Boy2 } from "@assets/images/signup/profile_boy2.svg";
import { ReactComponent as Man1 } from "@assets/images/signup/profile_man1.svg";
import { ReactComponent as Man2 } from "@assets/images/signup/profile_man2.svg";
import { ReactComponent as OldMan } from "@assets/images/signup/profile_oldman.svg";
import boy1 from "@assets/images/signup/profile_boy1.svg";
import boy2 from "@assets/images/signup/profile_boy2.svg";
import man1 from "@assets/images/signup/profile_man1.svg";
import man2 from "@assets/images/signup/profile_man2.svg";
import oldMan from "@assets/images/signup/profile_oldman.svg";
import { useMemberStore } from "@store/useMemberStore";

const SignupMemberSetRoleMale = (props: {
  inputRef: React.RefObject<HTMLInputElement>;
  goToMemberSetCheck: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
  setIcon: (icon: string) => void;
}) => {
  const { inputRef, goToMemberSetCheck, errorMessage, setErrorMessage, setIcon } = props;
  const { role, setRole, stringMemberImage, setStringMemberImage } = useMemberStore();

  return (
    <div className="signup-member-set-role-male">

      {/*역할 제목*/}
      <div className="signup-member-set-role-male__title-role">
        <span className="title__part--01">
          나의 역할
        </span>
        <span className="title__part--02">
          을 알려 주세요
        </span>
      </div>

      {/*역할*/}
      <div className="signup-member-set-role-male__role">
        <button
          className={role === "아빠" ? "btn-dad--selected" : "btn-dad"}
          onClick={() => setRole("아빠")}
        >
          <span className="btn-dad--text">
            아빠
          </span>
        </button>
        <button
          className={role === "아들" ? "btn-son--selected" : "btn-son"}
          onClick={() => setRole("아들")}
        >
          <span className="btn-son--text">
            아들
          </span>
        </button>
        <button
          className={role !== "아빠" && role !== "아들" && role !== null ? "btn-etc--selected" : "btn-etc"}
          onClick={() => setRole("")}
        >
          <span className="btn-etc--text">
            기타
          </span>
        </button>
      </div>

      {/*역할 기타 선택*/}
      <div className="signup-member-set-role-male__role-etc">
        {role !== "아빠" && role !== "아들" && role !== null ? (
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
      <div className="signup-member-set-role-male__error-message">
        {errorMessage ? (
          errorMessage
        ) : (
          '　'
        )}
      </div>

      {/*아이콘 제목*/}
      <div className="signup-member-set-role-male__title-icon">
        <span className="title__part--01">
          아이콘
        </span>
        <span className="title__part--02">
          을 선택해 주세요
        </span>
      </div>

      {/*아이콘*/}
      <div className="signup-member-set-role-male__icon">
        <div className="icon-box1">
          <button
            className={stringMemberImage === boy1 ? "icon-box__btn-kid--selected" : "icon-box__btn-kid"}
            onClick={() => {
              setStringMemberImage(boy1);
              setIcon("boy1");
            }}
          >
            <Boy1
              className={stringMemberImage === boy1 ? "btn-kid--icon--selected" : "btn-kid--icon"}
            />
          </button>
          <button
            className={stringMemberImage === man1 ? "icon-box__btn-young--selected" : "icon-box__btn-young"}
            onClick={() => {
              setStringMemberImage(man1);
              setIcon("man1");
            }}
          >
            <Man1
              className={stringMemberImage === man1 ? "btn-young--icon--selected" : "btn-young--icon"}
            />
          </button>
          <button
            className={stringMemberImage === oldMan ? "icon-box__btn-old--selected" : "icon-box__btn-old"}
            onClick={() => {
              setStringMemberImage(oldMan);
              setIcon("oldman");
            }}
          >
            <OldMan
              className={stringMemberImage === oldMan ? "btn-old--icon--selected" : "btn-old--icon"}
            />
          </button>
        </div>
        <div className="icon-box2">
          <button
            className={stringMemberImage === boy2 ? "icon-box__btn-kid--selected" : "icon-box__btn-kid"}
            onClick={() => {
              setStringMemberImage(boy2);
              setIcon("boy2");
            }}
          >
            <Boy2
              className={stringMemberImage === boy2 ? "btn-kid--icon--selected" : "btn-kid--icon"}
            />
          </button>
          <button
            className={stringMemberImage === man2 ? "icon-box__btn-young--selected" : "icon-box__btn-young"}
            onClick={() => {
              setStringMemberImage(man2);
              setIcon("man2");
            }}
          >
            <Man2
              className={stringMemberImage === man2 ? "btn-young--icon--selected" : "btn-young--icon"}
            />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SignupMemberSetRoleMale;