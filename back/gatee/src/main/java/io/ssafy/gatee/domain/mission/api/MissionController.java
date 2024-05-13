package io.ssafy.gatee.domain.mission.api;

import io.ssafy.gatee.domain.mission.application.MissionService;
import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

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
    ) throws IOException {
        return missionService.readMission(customUserDetails.getMemberId());
    }
}
