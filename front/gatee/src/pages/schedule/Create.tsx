import React, {useState, useEffect, useRef} from "react";
import { FamilyMemberInfoSample } from "../../constants";
import ProfileImage from '@assets/images/logo/app_icon_orange.png'
import { useSearchParams, useNavigate } from "react-router-dom"
import { TextField } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
dayjs.locale('ko');

const ScheduleCreate = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState<string | null>(null);
  const [color, setColor] = useState<string>("pink")
  const [content, setContent] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("family")
  const [startDate, setStartDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [startTime, setStartTime] = useState<Dayjs | null>();
  const [endTime, setEndTime] = useState<Dayjs | null>();
  const [participant, setParticipant] = useState<string[] | null>(null);
  const [isOpenColor, setIsOpenColor] = useState<boolean>(false)
  const colorList: string[] = ["pink", "yellow", "green", "blue", "purple"]
  const colorRef = useRef<HTMLDivElement>(null)
  const muiFocusCustom = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFBE5C",
          borderWidth: "2px",
        },
      }
    }
  }

  useEffect(() => {
    // 날짜 string to Dayjs
    setStartDate(dayjs(searchParams.get("start")))
    setEndDate(dayjs(searchParams.get("end")))
    setStartTime(dayjs(`${searchParams.get("start")}T00:00:00`))
    setEndTime(dayjs(`${searchParams.get("end")}T23:59:59`))
  }, []);

  // 일정 생성 버튼 클릭 핸들러
  const handleCreateSchedule = () => {
    console.log("Create schedule")
    navigate('/schedule')
  }

  // 시작 일자 수정 핸들러
  const handleSetStartDate = (newValue: Dayjs | null) => {
    if (newValue) {
      setStartDate(newValue);
      setSearchParams({"start": dayjs(newValue).format("YYYY-MM-DD")})
    }
  }

  // 종료 일자 수정 핸들러
  const handleSetEndDate = (newValue: Dayjs | null) => {
    if (newValue) {
      setEndDate(newValue);
      setSearchParams({"end": dayjs(newValue).format("YYYY-MM-DD")})
    }
  }

  // 시작 시간 수정 핸들러
  const handleSetStartTime = (newValue: Dayjs | null) => {
    if (newValue) {
      setStartTime(newValue)
    } else {
      setStartTime(dayjs(`${searchParams.get("start")}T00:00:00`))
    }
  }

  // 종료 시간 수정 핸들러
  const handleSetEndTime = (newValue: Dayjs | null) => {
    if (newValue) {
      setEndTime(newValue)
    } else {
      setEndTime(dayjs(`${searchParams.get("end")}T23:59:59`))
    }
  }

  // 요일 계산
  const calculateWeekday = (value: Dayjs | null) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = dayjs(value).day();
    if (dayOfWeek) {
      return weekdays[dayOfWeek];
    } else {
      return '요일';
    }
  };

  // 색상 코드 리턴
  const colorPalette = (value: string): string => {
    if (value === "pink") {
      return "#FFE8E8";
    } else if (value === "yellow") {
      return "#FFED91";
    } else if (value === "green") {
      return "#c2e5c5";
    } else if (value === "blue") {
      return "#b8cdff";
    } else if (value === "purple") {
      return "#d5beff";
    } else {
      return "#FFD08A";
    }
  };

  // 색상 선택 창 외부 클릭 감지
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (colorRef.current && !colorRef.current.contains(e.target as Node)) {
        setIsOpenColor(false);
      }
    };
    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, [colorRef]);

  return (
    <div className="create-schedule">
      <div className="create-schedule__input-container">
        <div className="create-schedule__title">일정 등록</div>
        {/*일정 설명*/}
        <div className="create-schedule-info">
          <div className="create-schedule__sub-title">설명</div>

          {/*일정 제목 입력*/}
          <div className="create-schedule-info__input-title">
            <TextField
              fullWidth
              placeholder="제목* (20자 이내)"
              inputProps={{ maxLength: 20 }}
              margin="normal"
              sx={muiFocusCustom}
            />

            {/*일정 색상 선택*/}
            <button
              className={`create-schedule-info__input-color-button${isOpenColor ? '--active' : ''}`}
              onClick={() => {if (!isOpenColor) setIsOpenColor(true)}}
              style={{backgroundColor: colorPalette(color)}}
            >
            </button>
          </div>

          {/*일정 내용 입력*/}
          <div className="create-schedule-info__input-content">
            <TextField
              fullWidth
              placeholder="상세 내용"
              multiline rows={4}
              sx={muiFocusCustom}
            />
          </div>

          {/*일정 카테고리 선택*/}
          <div className="create-schedule-info__input-category">
            <ToggleButtonGroup
              fullWidth
              value={category}
              exclusive
              onChange={(event: React.MouseEvent<HTMLElement>, newValue: string) => setCategory(newValue)}
            >
              <ToggleButton value="family">가족 일정</ToggleButton>
              <ToggleButton value="individual">개인 일정</ToggleButton>
              <ToggleButton value="event">이벤트</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>

        {/*일정 기간 선택*/}
        <div className="create-schedule-period">
          {/*일정 날짜 입력*/}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="create-schedule__sub-title">시작일</div>
            <div className="create-schedule-period__input">
              <DateField
                value={startDate}
                onChange={handleSetStartDate}
                format={`YYYY-MM-DD (${calculateWeekday(startDate)})`}
                margin="normal"
                sx={muiFocusCustom}
                className="create-schedule-period__date"
              />
              <TimeField
                value={startTime}
                onChange={handleSetStartTime}
                format="HH시 mm분"
                margin="normal"
                sx={muiFocusCustom}
              />
            </div>

            <div className="create-schedule__sub-title">종료일</div>
            <div className="create-schedule-period__input">
              <DateField
                value={endDate}
                onChange={handleSetEndDate}
                format={`YYYY-MM-DD (${calculateWeekday(endDate)})`}
                margin="normal"
                sx={muiFocusCustom}
                className="create-schedule-period__date"
              />
              <TimeField
                value={endTime}
                onChange={handleSetEndTime}
                format="HH시 mm분"
                margin="normal"
                sx={muiFocusCustom}
              />
            </div>
          </LocalizationProvider>
        </div>

        {/*참여하는 사람*/}
        <div className="create-schedule-participant">
          <div className="create-schedule__sub-title">참여자</div>

          {/* 가족 프로필 */}
          <div className="create-schedule-participant__profile">
            {FamilyMemberInfoSample.map((member, index) => (
              <div key={ index }>
                <div className="create-schedule-participant__profile-image">
                  <img src={ ProfileImage } alt=""/>
                  {/*<img src={ member.image } alt={ member.nickname } />*/}
                </div>
                <div className="create-schedule-participant__profile-nickname">
                  { member.nickname }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*생성 버튼*/}
      <div className="create-schedule__button-create" onClick={handleCreateSchedule}>
        <button className="create-schedule__button-create">생성</button>
      </div>

      {/* 색상 선택창 */}
      {isOpenColor && (
        <div className="create-schedule__input-color" ref={colorRef}>
          <div className="create-schedule__input-color-title">일정 색상</div>
          <div className="create-schedule__input-color-list">
            {colorList.map((value: string, index: number) => (
              <button
                key={index}
                className={`create-schedule__input-color-item${value === color ? '--active' : ''}`}
                style={{ backgroundColor: colorPalette(value) }}
                onClick={() => {
                  setColor(value);
                  setIsOpenColor(false);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ScheduleCreate;