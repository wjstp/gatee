package io.ssafy.gatee.domain.mission.dto.response;

import io.ssafy.gatee.domain.mission.entity.Mission;
import io.ssafy.gatee.domain.mission.entity.Type;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MissionListRes(

        @NotNull
        Long id,

        @NotNull
        Type type,

        @NotNull
        Boolean isComplete,

        @NotNull
        Integer nowRange,

        @NotNull
        Integer maxRange,

        @NotNull
        Integer completedLevel
) {
    public static MissionListRes toDto(Mission mission) {
        return MissionListRes.builder()
                .id(mission.getId())
                .type(mission.getType())
                .isComplete(mission.isComplete())
                .nowRange(mission.getNowRange())
                .maxRange(mission.getMaxRange())
                .completedLevel(mission.getCompletedLevel())
                .build();
    }
}