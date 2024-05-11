package io.ssafy.gatee.domain.album.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record AlbumSaveRes(

        @NotNull
        Long albumId
) {
}
