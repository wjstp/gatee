package io.ssafy.gatee.domain.schedule.application;

import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;

import java.util.List;

public interface ScheduleService {
    ScheduleListRes readSchedule(Long familyId);
    ScheduleInfoRes readScheduleDetail(Long scheduleId);
}
