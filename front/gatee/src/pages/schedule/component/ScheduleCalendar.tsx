import React, { useRef } from 'react';
import { DayCellContentArg } from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { LuCalendarPlus } from "react-icons/lu";
import { Link } from "react-router-dom";


const ScheduleCalendar: React.FC = () => {
  const calendarRef:any = useRef(null)

  // 일자 클릭 핸들러 (일자별 일정 리스트)
  const handleDateClick = (arg: DateClickArg) => {
    console.log(arg);
  };

  // 영역 선택 시 핸들러
  const handleSelect = (arg: any) => {
    console.log('Selected range: ', arg.start, arg.end);
  };

  // 이전 달로 이동하는 클릭 핸들러
  const handlePrevClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
    }
  };

  // 다음 달로 이동하는 클릭 핸들러
  const handleNextClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
    }
  };

  // 오늘 날짜로 이동하는 클릭 핸들러
  const handleTodayClick = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
    }
  }

  return (
    <div className="schedule-calendar">
      {/*달력 헤더*/}
      <div className="schedule-calendar__header">
        {/*오늘 날짜 이동 버튼*/}
        <button className="schedule-calendar__button-today" onClick={ handleTodayClick }>
          <span>today</span>
        </button>

        <div className="schedule-calendar__title-wrapper">
          {/*이전 달 전환 버튼*/}
          <button className="schedule-calendar__button-month" onClick={ handlePrevClick }>
            <FaCaretLeft size={18} />
          </button>

          {/*달력 제목*/}
          <div className="schedule-calendar__month">4월</div>

          {/*다음 달 전환 버튼*/}
          <button className="schedule-calendar__button-month" onClick={ handleNextClick }>
            <FaCaretRight size={18} />
          </button>
        </div>

        {/*일정 추가 버튼*/}
        <Link to="/schedule/create-schedule" className="schedule-calendar__button-add-event">
          <LuCalendarPlus size={20} />
        </Link>
      </div>

      {/*달력*/}
      <FullCalendar
        ref={ calendarRef }
        plugins={[ dayGridPlugin, interactionPlugin ]}
        headerToolbar={{ left: "", center: "", right: "" }}
        initialView="dayGridMonth"
        height="85%"            // calendar 높이
        locale="kr"             // 언어 한글로 변경
        selectable={ true }     // 영역 선택
        dayMaxEvents={ true }   // row 높이보다 많으면 +N more 링크 표시
        dayCellContent={(arg: DayCellContentArg) => {
          return arg.dayNumberText.replace('일', '');    // 일자에서 '일' 제거
        }}

        // 일정
        events={[
          { start: '2024-04-20', end: '2024-04-23', color: '#FFE8E8' },
          { start: '2024-04-21', end: '2024-04-24', color: '#FFED91' },
          { start: '2024-04-20', end: '2024-04-23', color: '#c2e5c5' },
        ]}
        eventTextColor="black"
        eventBorderColor="white"

        // 일자 클릭 이벤트
        dateClick={ handleDateClick }

        // 영역 선택 이벤트
        select={ handleSelect }
      />
    </div>
  );
};

export default ScheduleCalendar;
