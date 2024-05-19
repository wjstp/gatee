import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import calculateWeekday from "@utils/calculateWeekday";
import { ChatDateLine } from "@type/index";

interface ChatDateProps {
  chat: ChatDateLine;
}

const ChatDate = (props: ChatDateProps) => {
  const { chat } = props;
  const date: Dayjs = dayjs(chat.currentTime);
  return (
    <div className="chat__date">
      <div className="chat__date__main">
        { date.format("YYYY년 MM월 DD일") } ({calculateWeekday(date)})
      </div>
    </div>
  )
};

export default ChatDate;
