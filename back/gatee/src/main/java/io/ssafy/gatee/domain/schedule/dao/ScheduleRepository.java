package io.ssafy.gatee.domain.schedule.dao;

import io.ssafy.gatee.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository {
    Optional<Schedule> findById(Long scheduleId);
}
