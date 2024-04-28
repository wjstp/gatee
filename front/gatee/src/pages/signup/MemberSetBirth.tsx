import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignupMemberSetBirth = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const goToMemberSetRole = () => {
    navigate("/signup/member-set/role");

  }



  return (
    <div className="signup-member-set-birth">
      {/*제목*/}
      <div className="signup-member-set-birth__title">
        <span className="title__part--01">
          생일과 성별
        </span>
        <span className="title__part--02">
          을 입력해 주세요
        </span>
      </div>

      {/*생일 선택*/}
      <div className="date-picker">
        <div className="date-selector">
          {/* 여기에 사용자가 선택할 수 있는 날짜를 표시합니다. */}
          {selectedDate.toDateString()}
        </div>
      </div>

      {/*다음 버튼*/}
      <div className="signup-member-set-birth__btn">
        <button
          className="btn-next"
          onClick={goToMemberSetRole}
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>
    </div>
  );
};

export default SignupMemberSetBirth;