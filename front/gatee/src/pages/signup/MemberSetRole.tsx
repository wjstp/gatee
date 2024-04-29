import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignupMemberSetRole = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("");

  const goToMemberSetCheck = () => {
    navigate("/signup/member-set/check");
  }

  // 역할 선택 시 처리
  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <div className="signup-member-set-role">
      {/*역할 제목*/}
      <div className="signup-member-set-role__title-role">
        <span className="title__part--01">
          나의 역할
        </span>
        <span className="title__part--02">
          을 알려주세요
        </span>
      </div>

      {/*역할*/}
      <div className="signup-member-set-role__role">
        <div className="role-parents">
          <button
            className="role-parents__btn-dad"
            onClick={() => handleRoleSelect('dad')}
          >
            아빠
          </button>
          <button
            className="role-parents__btn-mom"
            onClick={() => handleRoleSelect('mom')}
          >
            엄마
          </button>
        </div>

        <div className="role-children">
          <button
            className="role-children__btn-son"
            onClick={() => handleRoleSelect('son')}
          >
            아들
          </button>
          <button
            className="role-children__btn-daughter"
            onClick={() => handleRoleSelect('daughter')}
          >
            딸
          </button>
        </div>
        <div className="role-etc">
          <button className="role-etc__btn-etc">기타</button>
        </div>
      </div>

      {/*아이콘 선택 제목*/}
      <div className="signup-member-set-role__title-icon">
        <span className="title__part--01">
          아이콘
        </span>
        <span className="title__part--02">
          을 선택해주세요
        </span>
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