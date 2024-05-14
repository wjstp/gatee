package io.ssafy.gatee.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ScheduleCancelReq(

        @NotNull
        String familyId
) {
}
