package io.ssafy.gatee.domain.mission.application;

import io.ssafy.gatee.domain.mission.dto.request.MissionTypeReq;
import io.ssafy.gatee.domain.mission.dto.response.MissionInfoRes;
import io.ssafy.gatee.domain.mission.entity.Type;

import java.util.UUID;

public interface MissionService {

    MissionInfoRes readMission(UUID memberId, UUID familyId);

    void progressMission(UUID memberId, MissionTypeReq missionTypeReq);

    void completeMission(UUID memberId, Type type);
}
