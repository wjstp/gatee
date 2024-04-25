import React from 'react';
import Calendar from "./component/Calendar";

function ScheduleIndex() {
  return (
    <div className="calendarContainer">
      <div className="banner5">

      </div>
      <div className="calendar">
        <div className="calendar__month">

        </div>
        <div className="calendar__day">
          <Calendar />
        </div>
      </div>
    </div>
  );
}

export default ScheduleIndex;