package io.ssafy.gatee.domain.schedule.application;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.schedule.dto.request.*;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.ScheduleNotFoundException;

import java.util.List;
import java.util.UUID;

public interface ScheduleService {
    
    List<ScheduleListRes> readSchedule(UUID familyId, Integer month) throws FamilyNotFoundException;

    ScheduleInfoRes readScheduleDetail(Long scheduleId, UUID familyId) throws ScheduleNotFoundException, FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException;

    void saveSchedule(ScheduleSaveReq scheduleSaveReq, UUID memberId) throws FamilyNotFoundException, FirebaseMessagingException;

    void editSchedule(ScheduleEditReq scheduleEditReq, UUID memberId, Long scheduleId) throws ScheduleNotFoundException, DoNotHavePermissionException, FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException, FamilyNotFoundException;

    void deleteSchedule(Long scheduleId);

    void participateSchedule(ScheduleParticipateReq scheduleParticipateReq, UUID memberId, Long scheduleId) throws FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException;

    void cancelSchedule(ScheduleCancelReq scheduleCancelReq, UUID memberId, Long scheduleId) throws FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException;

    void saveScheduleRecord(ScheduleSaveRecordReq scheduleSaveRecordReq, UUID memberId, Long scheduleId);

    void deleteScheduleRecord(Long scheduleId, Long scheduleRecordId, UUID memberId);
}
