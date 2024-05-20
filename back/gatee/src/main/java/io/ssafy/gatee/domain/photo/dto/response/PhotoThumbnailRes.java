package io.ssafy.gatee.domain.photo.dto.response;

import io.ssafy.gatee.domain.photo.entity.Photo;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record PhotoThumbnailRes(

        @NotNull
        Long photoId,

        @NotNull
        String imageUrl,

        @NotNull
        LocalDateTime createdAt
) {
        public static PhotoThumbnailRes toDto(Photo photo) {
                return PhotoThumbnailRes.builder()
                        .photoId(photo.getId())
                        .imageUrl(photo.getFile().getUrl())
                        .createdAt(photo.getCreatedAt())
                        .build();
        }
}
