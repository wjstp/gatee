package io.ssafy.gatee.domain.album.dto.response;

import io.ssafy.gatee.domain.photo_album.entity.PhotoAlbum;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record AlbumListRes(

        @NotNull
        Long albumId,

        @NotNull
        String name,

        Long photoId,

        String imageUrl
) {
    public static AlbumListRes toDto(PhotoAlbum photoAlbum) {
        return AlbumListRes.builder()
                .albumId(photoAlbum.getAlbum().getId())
                .name(photoAlbum.getAlbum().getName())
                .photoId(photoAlbum.getPhoto().getId())
                .imageUrl(photoAlbum.getPhoto().getFile().getUrl())
                .build();
    }
}
