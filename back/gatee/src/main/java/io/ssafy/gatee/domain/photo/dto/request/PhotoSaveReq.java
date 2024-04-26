package io.ssafy.gatee.domain.photo.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record PhotoSaveReq(

        @NotNull
        Long memberFamilyId,

        @NotNull
        Long fileId
) {
}
