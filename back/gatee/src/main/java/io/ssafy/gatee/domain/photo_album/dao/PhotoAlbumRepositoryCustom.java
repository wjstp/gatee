package io.ssafy.gatee.domain.photo_album.dao;

import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoAlbumRepositoryCustom {
    List<AlbumListRes> findAlbumThumbnailByAlbum(List<Album> albumList);
    List<AlbumPhotoListRes> findPhotoByAlbum(Album album);
}
