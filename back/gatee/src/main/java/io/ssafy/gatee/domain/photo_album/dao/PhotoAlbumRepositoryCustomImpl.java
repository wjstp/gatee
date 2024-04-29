package io.ssafy.gatee.domain.photo_album.dao;

import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import io.ssafy.gatee.domain.photo_album.entity.PhotoAlbum;
import io.ssafy.gatee.domain.photo_album.entity.QPhotoAlbum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PhotoAlbumRepositoryCustomImpl implements PhotoAlbumRepositoryCustom {
    public final JPQLQueryFactory jpqlQueryFactory;

    // 앨범 목록에 들어갈 각 앨범 별 썸네일 이미지 조회
    @Override
    public List<AlbumListRes> findAlbumThumbnailByAlbum(List<Album> albumList) {

        QPhotoAlbum photoAlbum = QPhotoAlbum.photoAlbum;

        List<PhotoAlbum> photoAlbumList = albumList.stream().map((album) -> {
            return jpqlQueryFactory.selectFrom(photoAlbum)
                    .where(photoAlbum.album.eq(album))
                    .orderBy(photoAlbum.createdAt.desc())
                    .limit(1)
                    .fetch().get(0);
        }).toList();

        return photoAlbumList.stream().map(AlbumListRes::toDto).toList();
    }

    // 특정 앨범에 포함되는 사진 리스트 조회
    @Override
    public List<AlbumPhotoListRes> findPhotoByAlbum(Album album) {

        QPhotoAlbum photoAlbum = QPhotoAlbum.photoAlbum;

        return jpqlQueryFactory.selectFrom(photoAlbum)
                .where(photoAlbum.album.eq(album))
                .orderBy(photoAlbum.createdAt.desc())
                .fetch().stream().map(AlbumPhotoListRes::toDto).toList();
    }
}
