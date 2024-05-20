package io.ssafy.gatee.domain.mission.dto.request;

import io.ssafy.gatee.domain.mission.entity.Type;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MissionTypeReq(

        @NotNull
        Type type,

        Integer photoCount
) {
}
