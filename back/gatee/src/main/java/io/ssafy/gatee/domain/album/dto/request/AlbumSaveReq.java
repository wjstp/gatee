package io.ssafy.gatee.domain.album.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record AlbumSaveReq(

        @NotNull
        UUID familyId,

        @NotNull
        String name
) {
}
