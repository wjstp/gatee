import React, { useState, useEffect } from "react";
import { FamilyMemberInfoSample } from "../../constants";
import ProfileImage from '@assets/images/logo/app_icon_orange.png'
import { useSearchParams, useNavigate } from "react-router-dom"
// import { Schedule } from "../../types";
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';


const ScheduleCreate = () => {
  const today: Dayjs = dayjs();;
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [participant, setParticipant] = useState<string[] | null>(null);
  const [startDate, setStartDate] = useState<Dayjs | null>(today);
  const [endDate, setEndDate] = useState<Dayjs | null>(today);

  useEffect(() => {
    // 날짜 string to Dayjs
    if (searchParams.get("start") && searchParams.get("end")) {
      setStartDate(dayjs(`${searchParams.get("start")}T00:00:00`))
      setEndDate(dayjs(`${searchParams.get("end")}T23:59:59`))
    }
  }, []);

  // 일정 생성 핸들
  const handleCreateSchedule = () => {
    console.log("Create schedule")
    navigate('/schedule')
  }

  // 시작 일자 수정 핸들
  const handleSetStartDate = (newValue: Dayjs | null) => {
    if (newValue) {
      const [year, month, day]: number[] = [newValue.get("year"), newValue.get("month"), newValue.get("day")];

      // setStartDate(newStartDate);
      // console.log(newStartDate)
    } else {
      setStartDate(null);
    }
  }

  // 종료 일자 수정 핸들
  const handleSetEndDate = (newValue: Dayjs | null) => {

  }

  // 시작 시간 수정 핸들
  const handleSetStartTime = (newValue: Dayjs | null) => {

  }

  // 종료 시간 수정 핸들
  const handleSetEndTIme = (newValue: Dayjs | null) => {

  }

  return (
    <div className="create-schedule">
      <div className="create-schedule__input-container">
        <div className="create-schedule__title">일정 등록</div>

        {/*일정 설명*/}
        <div className="create-schedule-info">
          <div className="create-schedule__sub-title">설명</div>

          {/*일정 제목 입력*/}
          <div className="create-schedule-info__input-title">
            <input type="text" placeholder="제목 *"/>

            {/*일정 색상 선택*/}
            <div className="create-schedule-info__input-color">
            </div>
          </div>

          {/*일정 내용 입력*/}
          <div className="create-schedule-info__input-content">
            <input type="text" placeholder="상세 내용"/>
          </div>

          {/*일정 카테고리 선택*/}
          <div className="create-schedule-info__input-category">
            <div className="create-schedule-info__input-category-family">

            </div>
            <div className="create-schedule-info__input-category-individual">

            </div>
          </div>
        </div>

        {/*일정 기간 선택*/}
        <div className="create-schedule-period">
          <div className="create-schedule__sub-title">기간</div>

          {/*일정 날짜 입력*/}
          <div className="create-schedule-period__date">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <DateField
                value={startDate}
                onChange={handleSetStartDate}
                format="YYYY-MM-DD"
              />
              <DateField
                value={endDate}
                onChange={handleSetEndDate}
                format="YYYY-MM-DD"
              />
            </LocalizationProvider>
          </div>

          {/*일정 시간 입력*/}
          <div className="create-schedule-period__time">
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ko">
              <TimeField
                defaultValue={dayjs('2022-04-17T15:30')}
                format="hh:mm"
              />
            </LocalizationProvider>
          </div>
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
    </div>
  );
}

export default ScheduleCreate;