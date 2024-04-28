package io.ssafy.gatee.domain.album.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record AlbumListRes(

        @NotNull
        Long albumId,

        @NotNull
        String imageUrl,

        @NotNull
        String name
) {
}
