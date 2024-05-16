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
import {ScheduleDetailRes, ScheduleRecord, FileRes} from "@type/index";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";

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
    scheduleRecordRes: null,
    participateMembers: []
  });

  // id를 number 타입으로 변환
  useEffect(() => {
    if (id) {
      setScheduleId(parseInt(id, 10));
    }
  }, [id]);

  // 일정 상세 조회
  useEffect(() => {
    if (scheduleId && familyId) {
      const data = {
        scheduleId,
        familyId
      }
      getDetailScheduleApi(
        data,
        (res) => {
          setSchedule(res.data);
        },
        (err) => {
          console.error(err);
        }
      ).then().catch();
    }
  }, [scheduleId]);

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
            content: "후기요",
            fileIdList: [1]
          }
        },
        (res) => {
          console.log(res);
          // navigate(`/schedule/${scheduleId}/record`);
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
          console.log(res);
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
          console.log(res);
        },
        (err) => {
          console.log(err);
        }
      )
    }
  }

  return (
    <div className="schedule-detail">
      {/*일정 삭제*/}
      <button onClick={handleScheduleDeleteClick}>
        일정 삭제
      </button>
      /
      {/*일정 후기 생성*/}
      <button onClick={handleCreateRecordClick}>
        일정 후기 생성
      </button>
      /
      {/*일정 후기 생성*/}
      <button onClick={handleApplyClick}>
        일정 참여
      </button>
      /
      {/*일정 후기 생성*/}
      <button onClick={handleApplyCancelClick}>
        일정 참여 취소
      </button>
      
      {/*일정 정보*/}
      <div className="schedule-detail__info">
        <p>Title: {schedule.title}</p>
        <p>Content: {schedule.content}</p>
        <p>Start Date: {schedule.startDate}</p>
        <p>End Date: {schedule.endDate}</p>
        <p>Emoji: {schedule.emoji}</p>
        <p>Participating Members:</p>
        <AvatarGroup max={6}>
          { schedule.participateMembers.map((participateMember: {profileImageUrl: string; nickname: string}, index: number) => {
            return <Avatar src={participateMember.profileImageUrl} alt={participateMember.nickname} key={index}/>;
          }) }
        </AvatarGroup >
      </div>

      {/*일정 후기*/}
      <div className="schedule-detail__record">
        {schedule.scheduleRecordRes && schedule.scheduleRecordRes.map((record: ScheduleRecord) => {
          return (
            <div key={record.scheduleRecordId}>
              <p>{record.content}</p>

              {record.fileUrlList.map((file: FileRes,) => (
                <img key={file.fileId} src={file.imageUrl} alt="" />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ScheduleDetail;