package io.ssafy.gatee.domain.mission.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record MissionInfoRes(

        @NotNull
        MissionImprovementsRes missionImprovementsRes,

        @NotNull
        List<MissionListRes> missionListResList
) {
    public static MissionInfoRes toDto(MissionImprovementsRes missionImprovementsRes, List<MissionListRes> missionListResList) {
        return MissionInfoRes.builder()
                .missionImprovementsRes(missionImprovementsRes)
                .missionListResList(missionListResList)
                .build();
    }
}
