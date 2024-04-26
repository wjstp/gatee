import React from 'react';
import ScheduleCalendar from "./component/ScheduleCalendar";

const ScheduleIndex = () => {
  return (
    <div className="calendarContainer">
      {/*배너*/}
      <div className="banner4">
      </div>
      
      {/*달력*/}
      <ScheduleCalendar />
    </div>
  );
}

export default ScheduleIndex;