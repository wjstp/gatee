package io.ssafy.gatee.domain.photo.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record PhotoListRes(

        @NotNull
        Long photoId,

        @NotNull
        Long fileId,

        @NotNull
        String imageUrl,

        @NotNull
        UUID memberId
) {
}
