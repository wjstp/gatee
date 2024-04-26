package io.ssafy.gatee.domain.album.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record AlbumSaveReq(

        @NotNull
        Long familyId,

        @NotNull
        String name
) {
}
