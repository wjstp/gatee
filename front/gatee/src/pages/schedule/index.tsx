import React from 'react';
import ScheduleCalendar from "@pages/schedule/components/ScheduleCalendar";

const ScheduleIndex = () => {
  return (
    <div className="schedule-container">
      {/*배너*/}
      <div className="schedule__banner4">
      </div>

      {/*달력*/}
      <ScheduleCalendar />
    </div>
  );
}

export default ScheduleIndex;