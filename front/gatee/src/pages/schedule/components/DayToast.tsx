import React from 'react';
import { ScheduleSample } from "../../../constants"
import { Schedule } from "../../../types";
import DayScheduleCard, {ScheduleType} from "@pages/schedule/components/DayScheduleCard";

interface DayToastProps {
  date: string;
  onCloseClick: () => void;
}

const DayToast: React.FC<DayToastProps> = ({ date, onCloseClick }) => {
    return (
      <div className="day-toast">
        <div className="day-toast__header">
          <div className="day-toast__title">{date}</div>
          <button className="day-toast__close" onClick={onCloseClick}>close</button>
        </div>

        {/*일정 내용*/}
        <div className="day-toast__main">
          {/*일정이 없는 경우*/}
          <div className="day-toast__no-event">일정이 없습니다</div>

          {/*일정 리스트*/}
          {ScheduleSample.map((schedule: Schedule, index: number) => (
            <DayScheduleCard key={index} schedule={schedule} />
          ))}
        </div>
      </div>
    );
}

export default DayToast;