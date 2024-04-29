import React, { useRef, useState, useEffect } from "react";
import {DateSelectArg, DayCellContentArg} from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import googleCalendarPlugin from "@fullcalendar/google-calendar";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { LuCalendarPlus } from "react-icons/lu";
import { Link } from "react-router-dom";
import DayToast from "@pages/schedule/component/DayToast";


const ScheduleIndex: React.FC = () => {
  const calendarRef: any = useRef(null)
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [isOpenDayToast, setIsOpenDayToast] = useState<boolean>(false);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      const calendarDate = calendarApi.getDate();
      setCurrentDate(calendarDate);
    }
  }, []);

  // 이전 또는 다음 달로 이동하는 클릭 핸들러
  const handleMonthChange = (amount: number) => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(calendarApi.getDate().setMonth(calendarApi.getDate().getMonth() + amount));

      // 달력 업데이트
      const updatedDate = calendarApi.getDate();
      const firstDayOfMonth = new Date(updatedDate.setDate(2));
      const formattedFirstDayOfMonth = firstDayOfMonth.toISOString().slice(0, 10);
      setCurrentDate(updatedDate);
      setSelectedDate(formattedFirstDayOfMonth);
    }
  };

  // 일자 클릭 핸들러
  const handleDateClick = (arg: DateClickArg) => {
    setSelectedDate(arg.dateStr);
    setIsOpenDayToast(true);
  };

  // 영역 선택 핸들러
  const handleSelect = (arg: DateSelectArg) => {
    const selectedStartDate: string = arg.startStr;
    const selectedEndDate: string = arg.end.toISOString().slice(0, 10);
    console.log(selectedStartDate, selectedEndDate);
  };

  // 오늘 날짜로 이동하는 클릭 핸들러
  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();

      // 달력 업데이트
      const updatedDate = calendarApi.getDate();
      setCurrentDate(updatedDate);
      setIsOpenDayToast(false);
    }
  }

  // DayToast close 이벤트 핸들러
  const handleCloseClick = () => {
    setIsOpenDayToast(false);
  };

  return (
    <div className="schedule">
      {/*배너*/}
      <div
        className={`schedule__banner${currentDate.getMonth() + 1}${isOpenDayToast ? ' schedule__banner--open' : ''}`}></div>

      <div className="schedule-calendar">
        {/*달력 헤더*/}
        <div className="schedule-calendar__header">
        {/*오늘 날짜 이동 버튼*/}
          <button className="schedule-calendar__button-today" onClick={handleTodayClick}>
            <span>today</span>
          </button>

          <div className="schedule-calendar__title-wrapper">
            {/*이전 달 전환 버튼*/}
            <button className="schedule-calendar__button-month" onClick={() => handleMonthChange(-1)}>
              <FaCaretLeft size={18}/>
            </button>

            {/*달력 제목*/}
            <div className="schedule-calendar__month">
              {currentDate.getMonth() + 1}월
              <div className="schedule-calendar__year">
                {currentDate.getFullYear()}
              </div>
            </div>

            {/*다음 달 전환 버튼*/}
            <button className="schedule-calendar__button-month" onClick={() => handleMonthChange(1)}>
              <FaCaretRight size={18}/>
            </button>
          </div>

          {/*일정 추가 버튼*/}
          <Link to="/schedule/create-schedule" className="schedule-calendar__button-add-event">
            <LuCalendarPlus size={20} />
          </Link>
        </div>

        {/*달력*/}
        <div className={`schedule-calendar__main${isOpenDayToast ? ' schedule-calendar__main--open' : ''}`}>
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin, googleCalendarPlugin]}
            googleCalendarApiKey="AIzaSyCClq2xIHVM0X4dTFvFzh0_LAys-NfYpK0"    // 구글 캘린더 API
            headerToolbar={{left: "", center: "", right: ""}}
            initialView={"dayGridMonth"}
            height={"98%"}        // calendar 높이
            locale={"kr"}          // 언어 한글로 변경
            selectable={true}      // 영역 선택
            dayMaxEvents={true}    // row 높이보다 많으면 +N more 링크 표시
            moreLinkClick={"disable"}

            // Day cell render hooks
            dayCellContent={(arg: DayCellContentArg) => {
              const dayNumber: string = arg.dayNumberText.replace("일", "");   // 일자에서 '일' 제거
              return (
                <div className="schedule-calendar__day" style={{color: arg.isToday ? "white" : ""}}>
                  {dayNumber}
                  {arg.isToday && <div className="schedule-calendar__today"></div>}
                </div>
              )
            }}

            // 일정
            events={[
              {start: "2024-04-20", end: "2024-04-23", color: "#FFE8E8"},
              {start: "2024-04-21", end: "2024-04-24", color: "#FFED91"},
              {start: "2024-04-20", end: "2024-04-23", color: "#c2e5c5"},
              {googleCalendarId: "a4b307221657a836a362cba46d11bd369901b88fdb11fa9dbf71831f702f1468@group.calendar.google.com",}
            ]}
            eventTextColor={"black"}
            eventBorderColor={"white"}

            // 일자 클릭 이벤트
            dateClick={handleDateClick}

            // 영역 선택 이벤트
            select={handleSelect}
          />
        </div>
        
        {/*일자별 일정 리스트*/}
        {isOpenDayToast && <DayToast date={selectedDate} onCloseClick={handleCloseClick} />}
      </div>
    </div>
  );
};

export default ScheduleIndex;