package io.ssafy.gatee.domain.photo.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record PhotoSaveRes(

        @NotNull
        Long photoId
) {
}
