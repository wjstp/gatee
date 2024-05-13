package io.ssafy.gatee.domain.mission.application;

import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;

import java.util.List;
import java.util.UUID;

public interface MissionService {
    List<MissionListRes> readMission(UUID memberId);
}
