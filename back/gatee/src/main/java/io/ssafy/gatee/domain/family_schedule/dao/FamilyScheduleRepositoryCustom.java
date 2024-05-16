package io.ssafy.gatee.domain.family_schedule.dao;

import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyScheduleRepositoryCustom {

    List<Schedule> getAllScheduleList(Family family, Integer month);
}
