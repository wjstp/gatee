import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Picker from "react-mobile-picker";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const SignupMemberSetBirth = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarType, setCalendarType] = useState('solar'); // 'solar' or 'lunar'
  const [gender, setGender] = useState('male'); // 'male' or 'female'

  const goToMemberSetRole = () => {
    navigate("/signup/member-set/role", {
      state: {
        selectedDate,
        calendarType,
        gender
      }
    });
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
      <div className="signup-member-set-birth__birthday">
        <div className="birthday-calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']}>
              <DatePicker label="Basic date picker"/>
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="birthday-choice">
          <input
            className="birthday-choice__solar"
            type="radio"
            id="solar"
            name="calendarType"
            value="solar"
            checked={calendarType === 'solar'}
            onChange={(e) => setCalendarType(e.target.value)}
          />
          <label
            className="birthday-choice__solar--label"
            htmlFor="solar"
          >
            양력
          </label>
          <input
            className="birthday-choice__lunar"
            type="radio"
            id="lunar"
            name="calendarType"
            value="lunar"
            checked={calendarType === 'lunar'}
            onChange={(e) => setCalendarType(e.target.value)}
          />
          <label
            className="birthday-choice__lunar--label"
            htmlFor="lunar"
          >
            음력
          </label>
        </div>
      </div>

      {/* 성별 선택 */}
      <div className="signup-member-set-birth__gender">
        <div className="gender-choice">
          <input
            className="gender-choice__male"
            type="radio"
            id="male"
            name="gender"
            value="male"
            checked={gender === 'male'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label
            className="gender-choice__male--label"
            htmlFor="male"
          >
            남성
          </label>
          <input
            className="gender-choice__female"
            type="radio"
            id="female"
            name="gender"
            value="female"
            checked={gender === 'female'}
            onChange={(e) => setGender(e.target.value)}
          />
          <label
            className="gender-choice__female--label"
            htmlFor="female"
          >
            여성
          </label>
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
