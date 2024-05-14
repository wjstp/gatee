package io.ssafy.gatee.domain.mission.application;

import io.ssafy.gatee.domain.mission.dto.request.MissionTypeReq;
import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;
import io.ssafy.gatee.domain.mission.entity.Type;

import java.util.List;
import java.util.UUID;

public interface MissionService {
    List<MissionListRes> readMission(UUID memberId);
    void progressMission(UUID memberId, MissionTypeReq missionTypeReq);
    void completeMission(UUID memberId, Type type);
}
