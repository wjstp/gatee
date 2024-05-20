package io.ssafy.gatee.domain.photo_schedule_record.dao;

import io.ssafy.gatee.domain.photo_schedule_record.entity.PhotoScheduleRecord;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoScheduleRecordRepository extends JpaRepository<PhotoScheduleRecord, Long> {
    List<PhotoScheduleRecord> findAllByScheduleRecord(ScheduleRecord scheduleRecord);
}
