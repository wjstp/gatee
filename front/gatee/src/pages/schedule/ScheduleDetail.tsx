import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import dayjs from "dayjs";
import {
  applyScheduleParticipationApi,
  cancelScheduleParticipationApi,
  deleteScheduleApi,
  getDetailScheduleApi,
  deleteRecordApi,
} from "@api/schedule";
import {useFamilyStore} from "@store/useFamilyStore";
import {ScheduleDetailRes, ScheduleRecord, ScheduleType} from "@type/index";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Card from '@mui/material/Card';
import getColorInfo from "@utils/getColorCode";
import calculateWeekday from "@utils/calculateWeekday";
import {BsTextParagraph} from "react-icons/bs";
import {HiOutlineDotsHorizontal} from "react-icons/hi";
import {useMemberStore} from "@store/useMemberStore";
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {RiDeleteBin6Line} from "react-icons/ri";


function ScheduleDetail() {
  const {id} = useParams();
  const navigate = useNavigate();
  const {familyId} = useFamilyStore();
  const [scheduleId, setScheduleId] = useState<number | null>(null);
  const [schedule, setSchedule] = useState<ScheduleDetailRes>({
    scheduleId: 0,
    category: "",
    title: "",
    emoji: "",
    content: "",
    startDate: "",
    endDate: "",
    scheduleRecordResList: null,
    participateMembers: []
  });
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const {myInfo} = useMemberStore();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // id를 number 타입으로 변환
  useEffect(() => {
    if (id) {
      setScheduleId(parseInt(id, 10));
    }
  }, [id]);

  useEffect(() => {
    getDetailSchedule();
  }, [scheduleId]);

  // 일정 상세 조회
  const getDetailSchedule = () => {
    if (scheduleId && familyId) {
      const data = {
        scheduleId,
        familyId
      }
      getDetailScheduleApi(
        data,
        (res) => {
          setSchedule(res.data);
          const startDate = dayjs(res.data.startDate).format("M/D");
          const startWeekday = calculateWeekday(dayjs(res.data.startDate));
          const startTime = dayjs(res.data.startDate).format("HH:mm");
          const endDate = dayjs(res.data.endDate).format("M/D");
          const endWeekday = calculateWeekday(dayjs(res.data.endDate));
          const endTime = dayjs(res.data.endDate).format("HH:mm");
          setStartDate(`${startDate} (${startWeekday}) ${startTime}`)
          setEndDate(`${endDate} (${endWeekday}) ${endTime}`)
        },
        (err) => {
          console.error(err);
        }
      ).then().catch();
    }
  }

  // 일정 삭제 버튼 클릭 핸들러
  const handleScheduleDeleteClick = () => {
    if (scheduleId) {
      deleteScheduleApi(
        scheduleId,
        (res) => {
          navigate('/schedule');
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  // 일정 참여 버튼 클릭 핸들러
  const handleApplyClick = () => {
    if (scheduleId && familyId) {
      const data = {
        scheduleId,
        familyId
      }

      applyScheduleParticipationApi(
        data,
        (res) => {
          getDetailSchedule();
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  // 일정 참여 취소 버튼 클릭 핸들러
  const handleApplyCancelClick = () => {
    if (scheduleId && familyId) {
      const data = {
        scheduleId,
        familyId
      }

      cancelScheduleParticipationApi(
        data,
        (res) => {
          setSchedule(prevSchedule => {
            if (prevSchedule.participateMembers) {
              // 내 닉네임을 참여자 리스트에서 제거
              const updatedParticipants = prevSchedule.participateMembers.filter(participant => participant.nickname !== myInfo.nickname);
              return {
                ...prevSchedule,
                participateMembers: updatedParticipants
              };
            }
            return prevSchedule;
          });
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  // 참여 여부 반환
  const isParticipant = () => {
    return schedule.participateMembers.some((participateMember) => {
      return participateMember.nickname === myInfo.nickname;
    });
  }

  // 설정 토글
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 후기 삭제
  const handleRecordDeleteClick = (scheduleRecordId: number) => {
    if (scheduleId && scheduleRecordId) {
      deleteRecordApi(
        {
          scheduleId,
          scheduleRecordId
        }
        ,
        (res) => {
          // 삭제된 후기를 리스트에서 제거
          setSchedule(prevSchedule => {
            if (prevSchedule.scheduleRecordResList) {
              return {
                ...prevSchedule,
                scheduleRecordResList: prevSchedule.scheduleRecordResList.filter(record => record.scheduleRecordId !== scheduleRecordId)
              };
            }
            return prevSchedule;
          });
        },
        (err) => {
          console.error(err);
        }
      ).then().catch();
    }
  }

  const handlePhotoClick = (fileId: number) => {
    navigate(`/photo/${fileId}`);
  }

  const handleScheduleUpdateClick = () => {
    navigate({
      pathname: `/schedule/${scheduleId}/update`,
      search: `?category=${schedule.category}&title=${schedule.title}&content=${schedule.content}&emoji=${schedule.emoji}&start=${schedule.startDate}&end=${schedule.endDate}`,
    });
  }

  return (
    <div className="schedule-detail">
      {/*일정 정보*/}
      <div className="schedule-detail__info">
        {/*설정*/}
        <div className="schedule-detail__setting">
          <IconButton
            onClick={handleMenu}
          >
            <HiOutlineDotsHorizontal size={23}/>
          </IconButton>
        </div>

        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleScheduleDeleteClick} style={{color: "#FF4F4FFF"}}>삭제하기</MenuItem>
          <MenuItem onClick={handleScheduleUpdateClick}>수정하기</MenuItem>
        </Menu>

        {/*일정 제목*/}
        <div className="schedule-detail__title">
          <div className="schedule-detail__emoji"
               style={{backgroundColor: `${getColorInfo(schedule.emoji).code}`}}></div>
          {schedule.title}
        </div>

        {/*일정 날짜*/}
        <div className="schedule-detail__date">
          <p>{startDate} - {endDate}</p>
        </div>

        {schedule.content && (
          <div className="schedule-detail__content">
            <BsTextParagraph size={20}/>
            <div className="schedule-detail__content__text">
              {schedule.content}
            </div>
          </div>
        )}

        {schedule.category !== ScheduleType.EVENT && (
          <AvatarGroup max={6} className="schedule-detail__participant">
            {schedule.participateMembers.map((participateMember: {
              profileImageUrl: string;
              nickname: string
            }, index: number) => {
              return <Avatar src={participateMember.profileImageUrl} alt={participateMember.nickname} key={index}/>;
            })}
          </AvatarGroup>
        )}
      </div>

      {/*버튼 묶음*/}
      <div className="schedule-detail__button-wrapper">
        <div>
          {(!isParticipant() && schedule.category === ScheduleType.GROUP) ?
            <button
              className="schedule-detail__apply"
              onClick={handleApplyClick}
            >참석</button>
            :
            schedule.category === ScheduleType.GROUP ?
              <button
                className="schedule-detail__cancel"
                onClick={handleApplyCancelClick}
              >
                불참
              </button>
              :
              null
          }
        </div>
        <button
          onClick={() => navigate(`/schedule/${scheduleId}/record`)}
        >
          추억 기록하기
        </button>
      </div>

      {/*일정 후기*/}
      <div className="schedule-detail__record">
        {schedule.scheduleRecordResList && schedule.scheduleRecordResList.map((record: ScheduleRecord) => {
          return (
            <Card
              className="schedule-detail__record__card"
              variant="outlined"
              key={record.scheduleRecordId}
            >
              <div className="schedule-detail__record__profile">
                <div className="schedule-detail__record__profile__image">
                  <img src={record.profileImageUrl} alt=""/>
                </div>
                {record.nickname}
              </div>

              <div className="schedule-detail__record__content">
                {record.content}
              </div>

              <div
                className={`schedule-detail__record__image${record.scheduleRecordPhotoResList && record.scheduleRecordPhotoResList.length >= 2 ? '--multiple' : '--single'}`}>
                {record.scheduleRecordPhotoResList.map((file: { photoId: number; imageUrl: string; }) => (
                  <div className="schedule-detail__record__image__item" key={file.photoId} onClick={() => handlePhotoClick(file.photoId)}>
                    <img src={file.imageUrl} alt=""/>
                  </div>
                ))}
              </div>

              <div className="schedule-detail__record__delete" onClick={() => handleRecordDeleteClick(record.scheduleRecordId)}>
                <RiDeleteBin6Line size={20} />
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ScheduleDetail;