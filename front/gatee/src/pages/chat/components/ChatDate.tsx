import React from 'react';
import dayjs from 'dayjs';
import calculateWeekday from "@helpers/calculateWeekday";


const ChatDate: React.FC<{ date: string }> = ({ date }) => {
  return (
    <div className="chat__date">
      <div className="chat__date__main">
        { dayjs(date).format("YYYY년 MM월 DD일") } ({calculateWeekday(dayjs(date))})
      </div>
    </div>
  )
};

export default ChatDate;
