package io.ssafy.gatee.domain.family.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record FamilySaveReq(


        @NotNull
        String name
) {
}
