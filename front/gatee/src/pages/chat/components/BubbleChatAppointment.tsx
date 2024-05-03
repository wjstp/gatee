import React from 'react';
import { ChatItem } from "@type/index";
import dayjs from "dayjs";
import MegaphoneIcon from "@assets/images/icons/ic_megaphone.png";
import getUserInfoByEmail from "@helpers/getUserInfoByEmail";
import Card from '@mui/material/Card';

const BubbleChatAppointment:React.FC<{ chat: ChatItem }> = ({chat}) => {
  // 참여자 정보 콜백 함수
  const getParticipantsInfo = (email: string) => {
    const userInfo = getUserInfoByEmail(email);

    return (
      <div className="bubble-appointment__participants__item">
        <img src={userInfo.image} alt={userInfo.nickname}/>
      </div>
    );
  }

  return (
    <Card className="bubble-appointment" variant="outlined" sx={{borderRadius: 3}}>
      <div className="bubble-appointment__container">
        <div className="bubble-appointment__icon">
          <img src={ MegaphoneIcon } alt="Megaphone Icon"/>
        </div>

        <div className="bubble-appointment__content">
          {/*날짜*/}
          <div className="bubble-appointment__date">
            { dayjs(chat.createdAt).format("M월 D일") }
          </div>

          {/*내용*/}
          <div className="bubble-appointment__message">
            { chat.message }
          </div>

          {/*참여자 리스트*/}
          <div className="bubble-appointment__participants">
            {chat.participants && chat.participants.map(getParticipantsInfo)}
          </div>
        </div>
      </div>

      {/*버튼*/}
      <div className="bubble-appointment__button">
        <button className="bubble-appointment__button__accept">좋아요</button>
        <button className="bubble-appointment__button__refuse">다음에</button>
      </div>
    </Card>
  );
};

export default BubbleChatAppointment;