import React from 'react';
import { Schedule } from '../../../types';

interface DayScheduleCardProps {
  schedule: Schedule;
}

export enum ScheduleType {
  GROUP = 'group',
  PERSONAL = 'personal',
  EVENT = 'event'
}

const GroupSchedule: React.FC<DayScheduleCardProps> = ({ schedule }) => {
  return (
    <div className="day-toast__schedule-list-group">
      { schedule.title }
    </div>
  );
};

const PersonalSchedule: React.FC<DayScheduleCardProps> = ({ schedule }) => {
  return (
    <div className="day-toast__schedule-list-personal">
      { schedule.title }
    </div>
  );
};

const Event: React.FC<DayScheduleCardProps> = ({ schedule }) => {
  return (
    <div className="day-toast__schedule-list-event">
      { schedule.title }
    </div>
  );
};

const EventComponent: React.FC<{ schedule: Schedule }> = ({ schedule }) => {
  switch (schedule.category) {
    case ScheduleType.GROUP:
      return <GroupSchedule schedule={schedule} />;
    case ScheduleType.PERSONAL:
      return <PersonalSchedule schedule={schedule} />;
    case ScheduleType.EVENT:
      return <Event schedule={schedule} />;
    default:
      return null;
  }
};

export default EventComponent;