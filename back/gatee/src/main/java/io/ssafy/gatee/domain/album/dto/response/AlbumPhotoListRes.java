package io.ssafy.gatee.domain.album.dto.response;

import io.ssafy.gatee.domain.photo_album.entity.PhotoAlbum;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record AlbumPhotoListRes(
        @NotNull
        Long photoId,

        @NotNull
        Long fileId,

        @NotNull
        String imageUrl,

        @NotNull
        Long memberFamilyId,

        @NotNull
        Long photoAlbumId
) {
    public static AlbumPhotoListRes toDto(PhotoAlbum photoAlbum) {
        return AlbumPhotoListRes.builder()
                .photoId(photoAlbum.getPhoto().getId())
                .fileId(photoAlbum.getPhoto().getFile().getId())
                .imageUrl(photoAlbum.getPhoto().getFile().getUrl())
                .memberFamilyId(photoAlbum.getPhoto().getMemberFamily().getId())
                .photoAlbumId(photoAlbum.getId())
                .build();
    }
}
