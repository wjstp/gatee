package io.ssafy.gatee.domain.album.dao;

import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Long> {
    Optional<List<Album>> findAllByFamily(Family family);
}
