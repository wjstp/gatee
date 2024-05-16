import React from 'react';
import { ScheduleListRes } from '@type/index';
import { NavLink } from "react-router-dom";
import getColorCode from "@utils/getColorCode";
import { ScheduleType } from "@type/index";

type DayScheduleProps = {
  schedule: ScheduleListRes;
};

const Group = (props: DayScheduleProps) => {
  const { schedule } = props;
  return (
    <NavLink
      to={`/schedule/${schedule.scheduleId}`}
      className="day-toast__schedule-group"
    >
      <div className="day-toast__color" style={{backgroundColor: `${getColorCode(schedule.emoji)}`}}></div>
      <div>
        {schedule.startDate}
      </div>
      <div>
        {schedule.endDate}
      </div>
      <div>
        {schedule.title}
      </div>
      <div>
        {schedule.content}
      </div>
    </NavLink>
  );
};

const Personal = (props: DayScheduleProps) => {
  const {schedule} = props;
  return (
    <NavLink
      to={`/schedule/${schedule.scheduleId}`}
      className="day-toast__schedule-personal"
    >
      <div className="day-toast__color" style={{backgroundColor: `${getColorCode(schedule.emoji)}`}}></div>
      <div>
        {schedule.startDate}
      </div>
      <div>
        {schedule.endDate}
      </div>
      <div>
        {schedule.title}
      </div>
      <div>
        {schedule.content}
      </div>
    </NavLink>
  );
};

const Event = (props: DayScheduleProps) => {
  const {schedule} = props;
  return (
    <NavLink
      to={`/schedule/${schedule.scheduleId}`}
      className="day-toast__schedule-event"
    >
      <div className="day-toast__color" style={{backgroundColor: `${getColorCode(schedule.emoji)}`}}></div>
      <div>
        {schedule.startDate}
      </div>
      <div>
        {schedule.endDate}
      </div>
      <div>
        {schedule.title}
      </div>
      <div>
        {schedule.content}
      </div>
    </NavLink>
  );
};

const DayScheduleCard = (props: DayScheduleProps) => {
  const {schedule} = props;

  switch (schedule.category) {
    case ScheduleType.GROUP:
      return <Group schedule={schedule}/>;
    case ScheduleType.PERSONAL:
      return <Personal schedule={schedule} />;
    case ScheduleType.EVENT:
      return <Event schedule={schedule} />;
    default:
      return null;
  }
};

export default DayScheduleCard;