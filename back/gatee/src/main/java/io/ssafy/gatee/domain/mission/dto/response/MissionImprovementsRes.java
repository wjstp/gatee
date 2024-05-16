package io.ssafy.gatee.domain.mission.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MissionImprovementsRes(

        @NotNull
        Boolean albumMission,

        @NotNull
        Boolean examMission,

        @NotNull
        Boolean featureMission,

        @NotNull
        Boolean scheduleMission
) {
}
