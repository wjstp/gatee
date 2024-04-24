package io.ssafy.gatee.domain.schedule.api;

import io.ssafy.gatee.domain.schedule.application.ScheduleService;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleEditReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleParticipateReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleSaveReq;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermission;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyScheduleNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.ScheduleNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/schedule")
@RequiredArgsConstructor
public class ScheduleController {

    private final ScheduleService scheduleService;

    // 일정 리스트 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ScheduleListRes readSchedule(
            @Valid
            @RequestParam("familyId") Long familyId
    ) {
        return scheduleService.readSchedule(familyId);
    }

    // 일정 상세 조회
    @GetMapping("/{scheduleId}")
    @ResponseStatus(HttpStatus.OK)
    public ScheduleInfoRes readScheduleDetail(
            @PathVariable("scheduleId") Long scheduleId
    ) throws ScheduleNotFoundException {
        return scheduleService.readScheduleDetail(scheduleId);
    }

    // 일정 등록
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveSchedule(@Valid @RequestBody ScheduleSaveReq scheduleSaveReq) throws FamilyNotFoundException {
        scheduleService.saveSchedule(scheduleSaveReq);
    }

    // 일정 수정
    @PatchMapping("/{scheduleId")
    @ResponseStatus(HttpStatus.OK)
    public void editSchedule(
            @Valid
            @RequestBody ScheduleEditReq scheduleEditReq,
            @PathVariable("scheduleId") Long scheduleId
    ) throws ScheduleNotFoundException, DoNotHavePermission, MemberFamilyScheduleNotFoundException, FamilyScheduleNotFoundException {
        scheduleService.editSchedule(scheduleEditReq, scheduleId);
    }

    // 일정 삭제

    // 일정 참여
    @PostMapping("/scheduleId")
    @ResponseStatus(HttpStatus.OK)
    public void participateSchedule(
            @Valid
            @RequestBody ScheduleParticipateReq scheduleParticipateReq,
            @PathVariable("scheduleId") Long scheduleId
    ) throws MemberFamilyScheduleNotFoundException, FamilyScheduleNotFoundException {
        scheduleService.participateSchedule(scheduleParticipateReq, scheduleId);
    }
}
