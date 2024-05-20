package io.ssafy.gatee.domain.photo.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record PhotoListReq(

        @NotNull
        String familyId,

        @NotNull
        String filter,

        String year,

        String month
) {
}
