import React from 'react';
import { ChatAlarm } from "@type/index";
import Card from '@mui/material/Card';
import MegaphoneIcon from "@assets/images/icons/ic_megaphone.png";
import dayjs from "dayjs";
import AvatarGroup from "@mui/material/AvatarGroup";

interface ChatAlarmProps {
  chat: ChatAlarm;
}

const BubbleChatAlarm = (props: ChatAlarmProps) => {
  const { chat } = props;

  return (
    <Card className="bubble-appointment" variant="outlined" sx={{borderRadius: 3}}>
      <div className="bubble-appointment__info">
        {/*확성기 아이콘*/}
        <div className="bubble-appointment__icon">
          <img src={MegaphoneIcon} alt="Megaphone Icon"/>
        </div>

        {/*날짜*/}
        <div className="bubble-appointment__info-wrapper">
          <div className="bubble-appointment__date">
            {dayjs(chat.currentTime).format("M월 D일")}
          </div>
        </div>
      </div>
      
      {/*내용*/}
      <div className="bubble-appointment__message">
        { chat.content }
      </div>
      
      <div>
        <div className="bubble-appointment__participants-status">
          종료
        </div>
        <button className="bubble-appointment__sub-text">
          다음 약속을 잡아 볼까요?
        </button>
      </div>
    </Card>
);
};

export default BubbleChatAlarm;