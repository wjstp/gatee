package io.ssafy.gatee.domain.photo_schedule_record.dao;

import io.ssafy.gatee.domain.photo_schedule_record.entity.PhotoScheduleRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoScheduleRecordRepository extends JpaRepository<PhotoScheduleRecord, Long> {
}
