package io.ssafy.gatee.domain.photo_album.dao;

import io.ssafy.gatee.domain.photo_album.entity.PhotoAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoAlbumRepository extends JpaRepository<PhotoAlbum, Long> {
}
