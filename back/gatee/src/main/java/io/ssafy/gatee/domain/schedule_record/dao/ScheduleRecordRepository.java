package io.ssafy.gatee.domain.schedule_record.dao;

import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ScheduleRecordRepository extends JpaRepository<ScheduleRecord, Long> {
}
