package io.ssafy.gatee.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ScheduleParticipateReq(

        @NotNull
        String familyId
) {
}
