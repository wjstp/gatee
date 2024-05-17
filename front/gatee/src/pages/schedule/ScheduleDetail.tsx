import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import dayjs from "dayjs";
import {
  applyScheduleParticipationApi,
  cancelScheduleParticipationApi, createRecordApi,
  deleteScheduleApi,
  getDetailScheduleApi
} from "@api/schedule";
import {useFamilyStore} from "@store/useFamilyStore";
import {ScheduleDetailRes, ScheduleRecord, FileRes, ScheduleType} from "@type/index";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Card from '@mui/material/Card';
import getColorInfo from "@utils/getColorCode";
import calculateWeekday from "@utils/calculateWeekday";
import { BsTextParagraph } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {useMemberStore} from "@store/useMemberStore";

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
  const { myInfo } = useMemberStore();

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
          console.log(res.data)
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

  // 일정 후기 등록 버튼 클릭 핸들러
  const handleCreateRecordClick = () => {
    if (scheduleId) {
      createRecordApi(
        {
          scheduleId,
          data: {
            familyId: familyId,
            content: "후기요",
            fileIdList: [1, 2, 3, 4]
          }
        },
        (res) => {
          console.log(res);
          navigate(`/schedule/${scheduleId}/record`);
        },
        (err) => {
          console.log(err);
        }
      ).then().catch();
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
          getDetailSchedule();
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


  return (
    <div className="schedule-detail">
      {/*/!*일정 삭제*!/*/}
      {/*<button onClick={handleScheduleDeleteClick}>일정 삭제</button>/*/}
      {/*/!*일정 후기 생성*!/*/}
      {/*<button onClick={handleCreateRecordClick}>일정 후기 생성</button>/*/}
      {/*/!*일정 후기 생성*!/*/}
      {/*<button onClick={handleApplyClick}>일정 참여</button>/*/}
      {/*/!*일정 후기 생성*!/*/}
      {/*<button onClick={handleApplyCancelClick}>일정 참여 취소</button>*/}
      
      {/*일정 정보*/}
      <div className="schedule-detail__info">
        <div className="schedule-detail__setting">
          <HiOutlineDotsHorizontal size={23}/>
        </div>

        {/*일정 제목*/}
        <div className="schedule-detail__title">
          <div className="schedule-detail__emoji" style={{backgroundColor: `${getColorInfo(schedule.emoji).code}`}}></div>
          {schedule.title}
        </div>

        {/*일정 날짜*/}
        <div className="schedule-detail__date">
          <p>{startDate} - {endDate}</p>
        </div>

        {schedule.content && (
          <div className="schedule-detail__content">
            <BsTextParagraph size={20} />
            <div className="schedule-detail__content__text">
              {schedule.content}
            </div>
          </div>
        )}

        { schedule.category !== ScheduleType.EVENT && (
          <AvatarGroup max={6} className="schedule-detail__participant">
            { schedule.participateMembers.map((participateMember: {profileImageUrl: string; nickname: string}, index: number) => {
              return <Avatar src={participateMember.profileImageUrl} alt={participateMember.nickname} key={index}/>;
            }) }
          </AvatarGroup >
        )}

        {isParticipant() ?
          <button
            className="schedule-detail__button-cancel"
            onClick={handleApplyClick}
          >
            불참</button>
          :
          <button
            className="schedule-detail__button-apply"
            onClick={handleApplyCancelClick}
          >참석</button>
        }
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
                className={`schedule-detail__record__image${record.fileUrlList && record.fileUrlList.length >= 2 ? '--multiple' : '--single'}`}>
                {record.fileUrlList.map((file: FileRes,) => (
                  <div className="schedule-detail__record__image__item" key={file.fileId}>
                    <img src={file.imageUrl} alt=""/>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default ScheduleDetail;