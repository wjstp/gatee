package io.ssafy.gatee.domain.album.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record DeleteAlbumPhotoListReq(

        @NotNull
        List<Long> photoAlbumIdList
) {
}
