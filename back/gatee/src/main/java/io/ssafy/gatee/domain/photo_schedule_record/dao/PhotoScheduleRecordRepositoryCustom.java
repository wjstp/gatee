package io.ssafy.gatee.domain.photo_schedule_record.dao;

import io.ssafy.gatee.domain.photo_schedule_record.entity.PhotoScheduleRecord;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoScheduleRecordRepositoryCustom {
    List<PhotoScheduleRecord> findAllByScheduleRecordList(List<ScheduleRecord> scheduleRecordList);
}
