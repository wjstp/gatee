import React from 'react';
import SignupMemberSetRoleEtc from "@pages/signup/components/MemberSetRoleEtc";
import { ReactComponent as Boy } from "@assets/images/signup/profile_boy.svg";
import { ReactComponent as Man } from "@assets/images/signup/profile_man.svg";
import { ReactComponent as OldMan } from "@assets/images/signup/profile_old_man.svg";
import boy from "@assets/images/signup/profile_boy.svg";
import man from "@assets/images/signup/profile_man.svg";
import oldMan from "@assets/images/signup/profile_old_man.svg";
import { useMemberStore } from "@store/useMemberStore";

const SignupMemberSetRoleMale = (props: {
  inputRef: React.RefObject<HTMLInputElement>;
  goToMemberSetCheck: () => void;
  errorMessage: string;
  setErrorMessage: (message: string) => void;
}) => {
  const { inputRef, goToMemberSetCheck, errorMessage, setErrorMessage } = props;
  const { role, setRole, stringMemberImage, setStringMemberImage } = useMemberStore();

  return (
    <div className="signup-member-set-role-male">

      {/*역할 제목*/}
      <div className="signup-member-set-role-male__title-role">
        <span className="title__part--01">
          나의 역할
        </span>
        <span className="title__part--02">
          을 알려주세요
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
          을 선택해주세요
        </span>
      </div>

      {/*아이콘*/}
      <div className="signup-member-set-role-male__icon">
        <div className="icon-box">
          <button
            className={stringMemberImage === boy ? "icon-box__btn-kid--selected" : "icon-box__btn-kid"}
            onClick={() => setStringMemberImage(boy)}
          >
            <Boy
              className={stringMemberImage === boy ? "btn-kid--icon--selected" : "btn-kid--icon"}
            />
          </button>
          <button
            className={stringMemberImage === man ? "icon-box__btn-young--selected" : "icon-box__btn-young"}
            onClick={() => setStringMemberImage(man)}
          >
            <Man
              className={stringMemberImage === man ? "btn-young--icon--selected" : "btn-young--icon"}
            />
          </button>
          <button
            className={stringMemberImage === oldMan ? "icon-box__btn-old--selected" : "icon-box__btn-old"}
            onClick={() => setStringMemberImage(oldMan)}
          >
            <OldMan
              className={stringMemberImage === oldMan ? "btn-old--icon--selected" : "btn-old--icon"}
            />
          </button>
        </div>
      </div>

    </div>
  );
};

export default SignupMemberSetRoleMale;