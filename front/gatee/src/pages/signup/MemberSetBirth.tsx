import React, { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AiOutlineMan } from "react-icons/ai";
import { AiOutlineWoman } from "react-icons/ai";
import dayjs, { Dayjs } from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import {set} from "date-fns";

const SignupMemberSetBirth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputName = location.state?.inputName || "";

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs("2024-04-05"));
  const [calendarType, setCalendarType] = useState("solar");
  const [gender, setGender] = useState("male");

  const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : "";

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date); // 선택된 날짜를 업데이트
  };

  const goToMemberSetRole = () => {
    navigate("/signup/member-set/role", {
      state: {
        inputName,
        formattedDate,
        calendarType,
        gender
      }
    });
  }
  console.log(formattedDate)
  return (
    <div className="signup-member-set-birth">
      {/*생일 제목*/}
      <div className="signup-member-set-birth__title-birth">
        <span className="title-birth__part--01">
          생일
        </span>
        <span className="title-birth__part--02">
          을 입력해 주세요
        </span>
      </div>

      {/*생일 선택*/}
      <div className="signup-member-set-birth__birthday">
        <div className="birthday-calendar">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DateField']}
            >
              <DateField
                label="생년월일"
                defaultValue={dayjs("2024-04-05")}
                format="YYYY-MM-DD"
                autoFocus={true}
                color={"warning"}
                value={selectedDate}
                onChange={handleDateChange}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="birthday-choice">
          <input
            className="birthday-choice__solar"
            type="radio"
            name="calendarType"
            value="solar"
            checked={calendarType === "solar"}
            onChange={(e) => setCalendarType(e.target.value)}
          />
          <label
            className={calendarType === "solar" ? "birthday-choice__solar--label--selected" : "birthday-choice__solar--label"}
          >
            양력
          </label>
          <input
            className="birthday-choice__lunar"
            type="radio"
            name="calendarType"
            value="lunar"
            checked={calendarType === "lunar"}
            onChange={(e) => setCalendarType(e.target.value)}
          />
          <label
            className={calendarType === "lunar" ? "birthday-choice__lunar--label--selected" : "birthday-choice__lunar--label"}
          >
            음력
          </label>
        </div>
      </div>

      {/*성별 제목*/}
      <div className="signup-member-set-birth__title-gender">
        <span className="title-gender__part--01">
          성별
        </span>
        <span className="title-gender__part--02">
          을 골라주세요
        </span>
      </div>

      {/*성별 선택*/}
      <div className="signup-member-set-birth__gender">
        <div className="gender-choice">
          <button
            className={gender === "male" ? "gender-choice__btn-male--selected" : "gender-choice__btn-male"}
            onClick={() => setGender("male")}
          >
            <AiOutlineMan
              className={gender === "male" ? "btn-male--icon--selected" : "btn-male--icon"}
            />
          </button>
          <button
            className={gender === "female" ? "gender-choice__btn-female--selected" : "gender-choice__btn-female"}
            onClick={() => setGender("female")}
          >
            <AiOutlineWoman
              className={gender === "female" ? "btn-female--icon--selected" : "btn-female--icon"}
            />
          </button>
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
