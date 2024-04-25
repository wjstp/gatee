import React from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';

const Calendar = () => {
  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"  // 월 기준
        weekends={true}   // 주말 포함 여부
        headerToolbar={{
          left: "left",
          center: "center",
          right: "right"
        }}
        events={[
          {title: 'event 1', date: '2024-04-25'},
          {title: 'event 1', date: '2024-04-26'}
        ]}
      />
    </>
  );
};

export default Calendar;