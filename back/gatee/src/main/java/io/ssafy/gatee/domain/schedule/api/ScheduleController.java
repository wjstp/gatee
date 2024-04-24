package io.ssafy.gatee.domain.schedule.api;

import io.ssafy.gatee.domain.schedule.application.ScheduleService;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
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
    ) {
        return scheduleService.readScheduleDetail(scheduleId);
    }


    // 일정 등록

    // 일정 수정

    // 일정 삭제


}
