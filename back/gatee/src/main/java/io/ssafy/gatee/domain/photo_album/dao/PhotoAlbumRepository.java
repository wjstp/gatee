package io.ssafy.gatee.domain.photo_album.dao;

import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.domain.photo_album.entity.PhotoAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PhotoAlbumRepository extends JpaRepository<PhotoAlbum, Long> {
    List<PhotoAlbum> findByPhotoAndAlbum(Photo photo, Album album);
}
