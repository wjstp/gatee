import React from 'react';

interface DayToastProps {
  date: string;
  onCloseClick: () => void;
}

const DayToast: React.FC<DayToastProps> = ({ date, onCloseClick }) => {
    return (
      <div className="day-toast">
        <div>{date}</div>
        <button onClick={onCloseClick}>close</button>
        <div>No Events</div>

      </div>
    );
}

export default DayToast;