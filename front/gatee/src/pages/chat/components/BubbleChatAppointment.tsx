import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import dayjs from "dayjs";
import MegaphoneIcon from "@assets/images/icons/ic_megaphone.png";
import { ChatAppointment, MemberApiReq } from "@type/index";
import getUserInfo from "@utils/getUserInfo";
import { useFamilyStore } from "@store/useFamilyStore";
import { useMemberStore } from "@store/useMemberStore";

interface ChatAppointmentProps {
  chat: ChatAppointment;
}

const BubbleChatAppointment = (props: ChatAppointmentProps) => {
  const { chat } = props;
  const [isUserParticipant, setUserParticipant] = useState<boolean>(false);
  const { familyInfo } = useFamilyStore();
  const { myInfo } = useMemberStore();


  useEffect(() => {
    // 유저 이메일이 참여자 리스트에 있는지 확인
    if (chat.participants) {
      setUserParticipant(chat.participants.includes(myInfo.memberId));
    }
  }, [chat.participants, myInfo.memberId]);

  // 참여자 정보 콜백 함수
  const getParticipantsInfo = (id: string, index: number) => {
    const userInfo: null | MemberApiReq = getUserInfo(familyInfo, id);

    return <Avatar src={userInfo?.fileUrl} alt={userInfo?.nickname} key={index}/>;
  }


  return (
    <Card className="bubble-appointment" variant="outlined" sx={{ borderRadius: 3 }}>
      <div className="bubble-appointment__info">
        {/*확성기 아이콘*/}
        <div className="bubble-appointment__icon">
          <img src={ MegaphoneIcon } alt="Megaphone Icon"/>
        </div>

        <div className="bubble-appointment__info-wrapper">
          {/*날짜*/}
          <div className="bubble-appointment__date">
            { dayjs(chat.currentTime).format("M월 D일") }
          </div>

          {/*참여자 리스트*/}
          <AvatarGroup max={4} className="bubble-appointment__participants">
            { chat.participants && chat.participants.map(getParticipantsInfo) }
          </AvatarGroup >
        </div>
      </div>

      {/*내용*/}
      <div className="bubble-appointment__message">
        { chat.content }
      </div>

      {/* 참여자 여부 또는 버튼 렌더링 */}
      {isUserParticipant ? (
        <div className="bubble-appointment__participants-status">
          참여
        </div>
      ) : (
        <div className="bubble-appointment__button">
          <button className="bubble-appointment__button__accept">좋아요</button>
          <button className="bubble-appointment__button__refuse">다음에</button>
        </div>
      )}
    </Card>
  );
};

export default BubbleChatAppointment;