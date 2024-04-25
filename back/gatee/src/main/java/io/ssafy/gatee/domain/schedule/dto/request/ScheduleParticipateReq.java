package io.ssafy.gatee.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record ScheduleParticipateReq(

        UUID memberId,

        @NotNull
        String familyId
) {
}
