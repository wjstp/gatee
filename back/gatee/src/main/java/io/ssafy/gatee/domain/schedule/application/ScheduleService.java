package io.ssafy.gatee.domain.schedule.application;

import io.ssafy.gatee.domain.schedule.dto.request.ScheduleEditReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleParticipateReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleSaveRecordReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleSaveReq;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.ScheduleNotFoundException;

public interface ScheduleService {
    ScheduleListRes readSchedule(Long familyId) throws FamilyNotFoundException;
    ScheduleInfoRes readScheduleDetail(Long scheduleId) throws ScheduleNotFoundException;
    void saveSchedule(ScheduleSaveReq scheduleSaveReq) throws FamilyNotFoundException;
    void editSchedule(ScheduleEditReq scheduleEditReq, Long scheduleId) throws ScheduleNotFoundException, DoNotHavePermissionException, FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException, FamilyNotFoundException;
    void participateSchedule(ScheduleParticipateReq scheduleParticipateReq, Long scheduleId) throws FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException;
    void saveScheduleRecord(ScheduleSaveRecordReq scheduleSaveRecordReq, Long scheduleId);
}
