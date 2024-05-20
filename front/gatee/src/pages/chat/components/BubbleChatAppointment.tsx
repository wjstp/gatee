import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import dayjs from "dayjs";
import MegaphoneIcon from "@assets/images/icons/ic_megaphone.png";
import { FaRegHandPaper } from "react-icons/fa";
import { ChatAppointment, MemberApiReq } from "@type/index";
import getUserInfo from "@utils/getUserInfo";
import { useFamilyStore } from "@store/useFamilyStore";
import { useMemberStore } from "@store/useMemberStore";
import { useChatStore } from "@store/useChatStore";
import { getAppointmentParticipantsApi, applyAppointmentParticipationApi } from "@api/chat";

interface ChatAppointmentProps {
  chat: ChatAppointment;
}

const BubbleChatAppointment = (props: ChatAppointmentProps) => {
  const { chat } = props;
  const { familyInfo } = useFamilyStore();
  const { myInfo } = useMemberStore();
  const { isUserParticipant, setIsUserParticipant } = useChatStore();
  const [participants, setParticipants] = useState<string[]>([])
  const newIsUserParticipant: boolean = isUserParticipant[chat.appointmentId];
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const popoverOpen = Boolean(anchorEl);

  useEffect(() => {
    if (chat.appointmentId) {
      getParticipants();
    }
  }, []);

  // 참여자 리스트 조회
  const getParticipants = async () => {
    getAppointmentParticipantsApi(
      chat.appointmentId,
      (res) => {
        setParticipants(res.data.joinMemberIds);
      },
      (err) => {
        console.error(err);
      }
    ).then().catch()
  }

  // 약속 참여
  const applyParticipation = () => {
    if (chat.appointmentId) {
      applyAppointmentParticipationApi(
        chat.appointmentId,
        (res) => {
          setParticipants(prevParticipants => [...prevParticipants, myInfo.memberId]);
          setIsUserParticipant(chat.appointmentId, true);
          getParticipants();
        },
        (err) => {
          console.error(err);
        }
      )
    }
  }

  // 참여자 정보 콜백 함수
  const getParticipantsInfo = (id: string, index: number) => {
    const userInfo: null | MemberApiReq = getUserInfo(familyInfo, id);

    return <Avatar src={userInfo?.profileImageUrl} alt={userInfo?.nickname} key={index}/>;
  }
  
  // 참여자 리스트 갱신
  useEffect(() => {
    if (!isUserParticipant[chat.appointmentId]) {
      setIsUserParticipant(chat.appointmentId, participants.includes(myInfo.memberId))
    }
  }, [participants]);

  // 참여자 리스트 팝오버 핸들러
  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


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
            { participants.map(getParticipantsInfo) }
          </AvatarGroup >
        </div>
      </div>

      {/*내용*/}
      <div className="bubble-appointment__message">
        { chat.content }
      </div>

      {/* 참여자 여부 또는 버튼 렌더링 */}
      {newIsUserParticipant ? (
        <div className="bubble-appointment__participants-status">
          참여
        </div>
      ) : (
        <div className="bubble-appointment__button">
          <button
            className="bubble-appointment__button__accept"
            onClick={applyParticipation}
          >
            저요
            <FaRegHandPaper size={20}/>
          </button>
        </div>
      )}
    </Card>
  );
};

export default BubbleChatAppointment;
