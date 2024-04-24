package io.ssafy.gatee.domain.Family_schedule.dao;

import io.ssafy.gatee.domain.Family_schedule.entity.FamilySchedule;
import io.ssafy.gatee.domain.schedule.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyScheduleRepository extends JpaRepository {
    List<FamilySchedule> findByFamily_Id(Long familyId);
}
