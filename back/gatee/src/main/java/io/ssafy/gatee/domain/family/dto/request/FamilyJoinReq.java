package io.ssafy.gatee.domain.family.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record FamilyJoinReq(

        @NotNull
        String familyCode
) {
}
