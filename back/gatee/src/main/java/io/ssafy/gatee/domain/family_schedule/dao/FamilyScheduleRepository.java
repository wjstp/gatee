package io.ssafy.gatee.domain.family_schedule.dao;

import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.family_schedule.entity.FamilySchedule;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyScheduleRepository extends JpaRepository<FamilySchedule, Long> {
    List<FamilySchedule> findAllByFamily(Family family);

    Optional<FamilySchedule> findByFamilyAndSchedule(Family family, Schedule schedule);
}
