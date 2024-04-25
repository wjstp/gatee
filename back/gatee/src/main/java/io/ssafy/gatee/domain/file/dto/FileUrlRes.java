package io.ssafy.gatee.domain.file.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record FileUrlRes(

        @NotNull
        Long fileId,

        @NotNull
        String imageUrl
) {
}
