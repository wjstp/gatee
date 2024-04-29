package io.ssafy.gatee.domain.family_schedule.dao;

import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListInfoRes;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FamilyScheduleRepositoryCustom {

    List<ScheduleListInfoRes> getPersonalScheduleList(Family family);

    List<ScheduleListInfoRes> getGroupScheduleList(Family family);
}
