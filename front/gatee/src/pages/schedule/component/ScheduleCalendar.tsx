import React, { useState, useRef } from 'react';
import { EventApi } from '@fullcalendar/core'
import Calendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import FullCalendar from "@fullcalendar/react";

const ScheduleCalendar: React.FC = () => {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState<EventApi[]>([]);
  const calendarRef = useRef<any>(null)

  // 일자 클릭 핸들러 (일자별 일정 리스트)
  const handleDateClick = (arg: any) => {
    console.log(arg)
  }

  // 이전 달로 이동하는 클릭 핸들러
  const handlePrevClick = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.prev()
  };

  // 다음 달로 이동하는 클릭 핸들러
  const handleNextClick = () => {
    const calendarApi = calendarRef.current.getApi()
    calendarApi.next()
  };

  return (
    <div className="schedule__calendar">
      {/*달력 헤더*/}
      <div className="calendar__header">
        <button className="calendar__month-button" onClick={ handlePrevClick }>
          <FaCaretLeft size={24} />
        </button>
        <div className="calendar__title">4월</div>
        <button className="calendar__month-button" onClick={ handleNextClick }>
          <FaCaretRight size={24} />
        </button>
      </div>
      
      {/*달력*/}
      <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        headerToolbar={{ left: "", center: "", right: "" }}
        initialView="dayGridMonth"
        height="90%"          // calendar 높이
        locale="kr"           // 언어 한글로 변경
        editable={true}       // 일정 이벤트
        selectable={true}     // 영역 선택
        dayMaxEvents={true}   // row 높이보다 많으면 +N more 링크 표시
        dayCellContent={(arg) => {
          return arg.dayNumberText.replace('일', '');    // 일자에서 '일' 제거
        }}
        events={[
          { title: '', start: '2024-04-20', end: '2024-04-23' },
          { title: '', start: '2024-04-21', end: '2024-04-24' },
          { title: '', start: '2024-04-20', end: '2024-04-23' },
        ]}  // 이벤트 리스트
        eventColor="#FFE8E8"    // 일정 컨테이너 색상
        eventTextColor="black"  // 일정 텍스트 색상
        dateClick={ handleDateClick }   // 일자 클릭 이벤트
      />
    </div>
  );
};

export default ScheduleCalendar;