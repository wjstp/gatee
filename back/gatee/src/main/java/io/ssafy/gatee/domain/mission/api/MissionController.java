package io.ssafy.gatee.domain.mission.api;

import io.ssafy.gatee.domain.mission.application.MissionService;
import io.ssafy.gatee.domain.mission.dto.request.MissionTypeReq;
import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;
import io.ssafy.gatee.domain.mission.entity.Type;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/missions")
@RequiredArgsConstructor
public class MissionController {

    private final MissionService missionService;

    // 미션 목록 확인
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<MissionListRes> readMission(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return missionService.readMission(customUserDetails.getMemberId());
    }

    // 미션 수행
    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public void progressMission(
            @RequestBody MissionTypeReq missionTypeReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        missionService.progressMission(customUserDetails.getMemberId(), missionTypeReq);
    }

    // 미션 완료
    @PatchMapping("/complete")
    @ResponseStatus(HttpStatus.OK)
    public void completeMission(
            @RequestBody MissionTypeReq missionTypeReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        missionService.completeMission(customUserDetails.getMemberId(), missionTypeReq.type());
    }
}
