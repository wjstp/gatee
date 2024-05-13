package io.ssafy.gatee.domain.family.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record FamilyCheckRes(

        @NotNull
        String familyId,

        @NotNull
        String familyName,

        @NotNull
        String familyImageUrl
) {
}
