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

const SignupMemberSetBirth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const inputName = location.state?.inputName || "";

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs("2024-04-05"));
  const [calendarType, setCalendarType] = useState("solar");
  const [gender, setGender] = useState("male");

  const formattedDate = selectedDate ? selectedDate.format("YYYY-MM-DD") : "";
  const dateFieldCustom = {
    "& .MuiOutlinedInput-root": {
      color: "#000",
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFBE5C",
          borderWidth: "2px",
        },
      },
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "secondary.main",
        borderWidth: "3px",
      },
    },
  };

  const handleSetSelectedDateChange = (date: Dayjs | null) => {
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
        <div className="birthday-date-field">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateField"]}
            >
              <DateField
                className="birthday-datefield__input"
                format="YYYY / MM / DD"
                autoFocus={true}
                value={selectedDate}
                onChange={handleSetSelectedDateChange}
                inputProps={{
                  style: {
                    textAlign: "center", fontSize: "24px" },
                }}
                sx={dateFieldCustom}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="birthday-choice">
          <button
            className="birthday-choice__btn-solar"
            onClick={() => setCalendarType("solar")}
          >
            <input
              className="btn-solar__input"
              type="radio"
              name="calendarType"
              value="solar"
              checked={calendarType === "solar"}
              onChange={(e) => setCalendarType(e.target.value)}
            />
            <label
              className={calendarType === "solar" ? "btn-solar__input--label--selected" : "btn-solar__input--label"}
            >
              양력
            </label>
          </button>
          <button
            className="birthday-choice__btn-lunar"
            onClick={() => setCalendarType("lunar")}
          >
            <input
              className="btn-lunar__input"
              type="radio"
              name="calendarType"
              value="lunar"
              checked={calendarType === "lunar"}
              onChange={(e) => setCalendarType(e.target.value)}
            />
            <label
              className={calendarType === "lunar" ? "btn-lunar__input--label--selected" : "btn-lunar__input--label"}
            >
              음력
            </label>
          </button>
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
