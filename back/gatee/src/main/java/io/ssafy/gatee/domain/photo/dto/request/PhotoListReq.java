package io.ssafy.gatee.domain.photo.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record PhotoListReq(

        @NotNull
        Long familyId,

        @NotNull
        String filter,

        String year,

        String month
) {
}
