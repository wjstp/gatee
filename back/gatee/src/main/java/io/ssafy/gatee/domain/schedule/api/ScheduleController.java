package io.ssafy.gatee.domain.schedule.api;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.schedule.application.ScheduleService;
import io.ssafy.gatee.domain.schedule.dto.request.*;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.ScheduleNotFoundException;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    // 일정 리스트 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ScheduleListRes> readSchedule(
            @Valid
            @RequestParam String familyId,
            @RequestParam Integer month
    ) throws FamilyNotFoundException {
        return scheduleService.readSchedule(UUID.fromString(familyId), month);
    }

    // 일정 상세 조회
    @GetMapping("/{scheduleId}")
    @ResponseStatus(HttpStatus.OK)
    public ScheduleInfoRes readScheduleDetail(
            @PathVariable("scheduleId") Long scheduleId,
            @RequestParam UUID familyId
    ) throws ScheduleNotFoundException, FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException {
        return scheduleService.readScheduleDetail(scheduleId, familyId);
    }

    // 일정 등록
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveSchedule(
            @Valid
            @RequestBody ScheduleSaveReq scheduleSaveReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws FamilyNotFoundException, FirebaseMessagingException {
        scheduleService.saveSchedule(scheduleSaveReq, customUserDetails.getMemberId());
    }

    // 일정 수정
    @PatchMapping("/{scheduleId}")
    @ResponseStatus(HttpStatus.OK)
    public void editSchedule(
            @Valid
            @RequestBody ScheduleEditReq scheduleEditReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("scheduleId") Long scheduleId
    ) throws ScheduleNotFoundException, DoNotHavePermissionException, MemberFamilyScheduleNotFoundException, FamilyScheduleNotFoundException, FamilyNotFoundException {
        scheduleService.editSchedule(scheduleEditReq, customUserDetails.getMemberId(), scheduleId);
    }

    // 일정 삭제
    @DeleteMapping("/{scheduleId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteSchedule(
            @PathVariable("scheduleId") Long scheduleId
    ) {
        scheduleService.deleteSchedule(scheduleId);
    }

    // 일정 참여
    @PostMapping("/{scheduleId}")
    @ResponseStatus(HttpStatus.OK)
    public void participateSchedule(
            @Valid
            @RequestBody ScheduleParticipateReq scheduleParticipateReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("scheduleId") Long scheduleId
    ) throws MemberFamilyScheduleNotFoundException, FamilyScheduleNotFoundException {
        scheduleService.participateSchedule(scheduleParticipateReq, customUserDetails.getMemberId(), scheduleId);
    }

    // 일정 참여 취소
    @PatchMapping("/{scheduleId}/cancel")
    @ResponseStatus(HttpStatus.OK)
    public void cancelSchedule(
            @Valid
            @RequestBody ScheduleCancelReq scheduleCancelReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("scheduleId") Long scheduleId
    ) throws MemberFamilyScheduleNotFoundException, FamilyScheduleNotFoundException {
        scheduleService.cancelSchedule(scheduleCancelReq, customUserDetails.getMemberId(), scheduleId);
    }

    // 일정 후기 등록
    @PostMapping("/{scheduleId}/record")
    @ResponseStatus(HttpStatus.OK)
    public void saveScheduleRecord(
            @Valid
            @RequestBody ScheduleSaveRecordReq scheduleSaveRecordReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("scheduleId") Long scheduleId
    ) {
        scheduleService.saveScheduleRecord(scheduleSaveRecordReq, customUserDetails.getMemberId(), scheduleId);
    }

    // 일정 후기 삭제
    @DeleteMapping("/{scheduleId}/record/{scheduleRecordId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteScheduleRecord(
            @PathVariable("scheduleId") Long scheduleId,
            @PathVariable("scheduleRecordId") Long scheduleRecordId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        scheduleService.deleteScheduleRecord(scheduleId, scheduleRecordId, customUserDetails.getMemberId());
    }
}
