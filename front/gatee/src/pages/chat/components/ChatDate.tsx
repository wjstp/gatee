import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import calculateWeekday from "@helpers/calculateWeekday";


const ChatDate: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div className="chat__date">
      { dayjs(date).format("YYYY년 MM월 DD일") } ({calculateWeekday(dayjs(date))})
    </div>
  )
};

export default ChatDate;
