import React from 'react';
import {EventApi, DateSelectArg, EventClickArg, EventContentArg, formatDate} from '@fullcalendar/core'
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

interface CalendarState {
  weekendsVisible: boolean
  currentEvents: EventApi[]
}

export default class Calendar extends React.Component<{}, CalendarState> {
  state: CalendarState = {
    weekendsVisible: true,
    currentEvents: []
  }

  render() {
    return (
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        headerToolbar={{
          left: "prev",     // 이전 달 버튼
          center: "title",  // yyyy년 mm월
          right: 'next'     // 다음 달 버튼
        }}
        initialView="dayGridMonth"
        height="100%"       // calendar 높이
        locale="kr"         // 언어 한글로 변경
        editable={true}     // 일정 이벤트
        selectable={true}   // 영역 선택
        dayMaxEvents={true} // row 높이보다 많으면 +N more 링크 표시
        dayCellContent={(arg) => {
          // 날짜 셀에서 '일' 제거
          return arg.dayNumberText.replace('일', '');
        }}
        events={[
          { title: 'event', start: '2024-04-20', end: '2024-04-23' }
        ]}
      />
    )
  }
}
