import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import dayjs from "dayjs";
import {getDetailScheduleApi} from "@api/schedule";
import {useFamilyStore} from "@store/useFamilyStore";

function ScheduleDetail() {
  const {id} = useParams();
  const {familyId} = useFamilyStore();
  const [scheduleId, setScheduleId] = useState<number | null>(null);

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
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      ).then().catch();
    }
  }, [scheduleId]);

  return (
    <div></div>
  );
}

export default ScheduleDetail;