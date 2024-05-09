package io.ssafy.gatee.domain.photo.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record PhotoSaveReq(

        @NotNull
        Long fileId
) {
}
