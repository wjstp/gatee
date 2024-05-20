import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AiOutlineMan } from "react-icons/ai";
import { AiOutlineWoman } from "react-icons/ai";
import dayjs, { Dayjs } from 'dayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useMemberStore } from "@store/useMemberStore";
import base64 from "base-64";
import { useFamilyStore } from "@store/useFamilyStore";

const SignupMemberSetBirth = () => {
  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");
  const { familyName } = useFamilyStore();
  const { myInfo, setMyInfo,
    name,
    birth,
    birthType,
    gender,
    setBirth,
    setBirthType,
    setGender,
    setRole,
  } = useMemberStore();

  const [errorMessage, setErrorMessage] = useState<string>("");

  // 권한에 따라 redirect
  useEffect(() => {
    if (accessToken) {
      const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
      const decode = base64.decode(payload);
      const json = JSON.parse(decode);

      if (json.authorities[0] === "ROLE_ROLE_USER") {
        alert(`잘못된 접근입니다.`);
        navigate(`/main`);
      } else {
        if (!familyName) {
          alert('먼저 가족을 소개해주세요!');
          navigate(`/signup/family-set`);
        } else {
          if (!myInfo) {
            alert('먼저 이름을 입력해주세요!');
            navigate(`/signup/member-set`);
          }
        }
      }
    }
  }, []);

  // MUI 커스텀 스타일
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
    width: "100px",
  };

  // 날짜 형식 검증 함수 (YYYY-MM-DD)
  const isValidDateFormat = (date: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

  // 오늘 날짜보다 미래인지 검증하는 함수
  const isFutureDate = (date: string) => {
    return dayjs(date).isAfter(dayjs());
  };

  // 날짜 핸들러
  const handleSetSelectedDateChange = (date: Dayjs | null) => {
    if (date) {
      const formattedDate = date.format("YYYY-MM-DD");
      if (isValidDateFormat(formattedDate)) {
        setBirth(formattedDate);
        if (isFutureDate(formattedDate)) {
          setErrorMessage('유효한 날짜를 선택해 주세요');
        } else {
          setErrorMessage('');
        }
      }
    } else {
      setBirth('');
    }
  };

  // 음력 양력 바꾸기
  const changeBirthType = (birthType: string) => {
    if (birthType === "SOLAR") {
      setBirthType("LUNAR")
    } else {
      setBirthType("SOLAR")
    }
  }

  // 역할 초기화
  useEffect(() => {
    setRole(null)
  }, [gender]);

  // 다음으로 가기
  const goToMemberSetRole = () => {
    navigate("/signup/member-set/role");
  }

  return (
    <div className="signup-member-set-birth slide-in">

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

        {/*날짜 입력*/}
        <div className="birthday-date-field">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={["DateField"]}
            >
              <DateField
                className="birthday-datefield__input"
                format="YYYY / MM / DD"
                autoFocus={true}
                value={birth ? dayjs(birth) : null}
                onChange={handleSetSelectedDateChange}
                inputProps={{
                  style: {
                    textAlign: "center", fontSize: "22px" },
                }}
                sx={dateFieldCustom}
                maxDate={dayjs()}
                spellCheck={false}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        {/*음력 선택*/}
        <div className="birthday-choice">
          <div className="birthday-choice__lunar">
            <button
              className="btn-lunar"
              onClick={() => changeBirthType(birthType)}
            >
              <input
                className="btn-lunar__input"
                type="checkbox"
                name="calendarType"
                value="LUNAR"
                checked={birthType === "LUNAR"}
                onClick={() => changeBirthType(birthType)}
                readOnly
              />
              <label
                className={birthType === "LUNAR" ? "btn-lunar__input--label--selected" : "btn-lunar__input--label"}
              >
                음력
              </label>
            </button>
          </div>
        </div>

      </div>

      {/*에러 메시지*/}
      <div className="signup-member-set__error-message">
        {errorMessage ? (
          errorMessage
        ) : (
          "　"
        )}
      </div>

      {/*성별 제목*/}
      <div className="signup-member-set-birth__title-gender">
        <span className="title-gender__part--01">
          성별
        </span>
        <span className="title-gender__part--02">
          을 선택해 주세요
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
          disabled={
            !birth ||
            !gender ||
            !isValidDateFormat(birth) ||
            isFutureDate(birth)
          }
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
