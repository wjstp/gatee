package io.ssafy.gatee.domain.family_schedule.dao;

import io.ssafy.gatee.domain.family_schedule.entity.FamilySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FamilyScheduleRepository extends JpaRepository {
    List<FamilySchedule> findByFamily_Id(Long familyId);
    Optional<FamilySchedule> findByFamily_IdAndSchedule_Id(Long familyId, Long scheduleId);
}
