package io.ssafy.gatee.domain.photo.dto.response;

import io.ssafy.gatee.domain.photo.entity.Photo;
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
        Long memberFamilyId
) {
        public static PhotoListRes toDto(Photo photo) {
                return PhotoListRes.builder()
                        .photoId(photo.getId())
                        .fileId(photo.getFile().getId())
                        .imageUrl(photo.getFile().getUrl())
                        .memberFamilyId(photo.getMemberFamily().getId())
                        .build();
        }
}
