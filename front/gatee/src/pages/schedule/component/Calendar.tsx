import React from 'react';
import {
  EventApi,
  DateSelectArg,
  EventClickArg,
  EventContentArg,
  formatDate,
} from '@fullcalendar/core'
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
          left: "prev",
          center: "title",
          right: 'next'
        }}
        initialView="dayGridMonth"
        height="75dvh"      // calendar 높이
        editable={true}     // 일정 이벤트
        selectable={true}   // 영역 선택
        dayMaxEvents={true} // row 높이보다 많으면 +N more 링크 표시
      />
    )
  }
}