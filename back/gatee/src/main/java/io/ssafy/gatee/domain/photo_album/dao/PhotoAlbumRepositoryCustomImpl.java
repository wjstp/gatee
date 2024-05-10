package io.ssafy.gatee.domain.photo_album.dao;

import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.photo_album.entity.PhotoAlbum;
import io.ssafy.gatee.domain.photo_album.entity.QPhotoAlbum;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class PhotoAlbumRepositoryCustomImpl implements PhotoAlbumRepositoryCustom {
    public final JPQLQueryFactory jpqlQueryFactory;

    // 앨범 목록에 들어갈 각 앨범 별 썸네일 이미지 조회
    @Override
    public List<AlbumListRes> findAlbumThumbnailByAlbum(List<Album> albumList) {

        QPhotoAlbum photoAlbum = QPhotoAlbum.photoAlbum;

        List<List<PhotoAlbum>> photoAlbumList = albumList.stream().map((album) -> {
            List<PhotoAlbum> photoAlbumOne = jpqlQueryFactory.selectFrom(photoAlbum)
                    .where(photoAlbum.album.eq(album))
                    .orderBy(photoAlbum.createdAt.desc())
                    .limit(1)
                    .fetch();

            if (photoAlbumOne.isEmpty()) {
                List<PhotoAlbum> list = new ArrayList<>();

                list.add(PhotoAlbum.builder()
                        .album(album)
                        .photo(null)
                        .build());

                return list;
            } else {
                return photoAlbumOne;
            }
        }).toList();

        return photoAlbumList.stream().map((photoAlbums) -> {
            PhotoAlbum photoAlbum1 = photoAlbums.get(0);

            if (photoAlbum1.getPhoto() == null) {
                return AlbumListRes.builder()
                        .albumId(photoAlbum1.getAlbum().getId())
                        .name(photoAlbum1.getAlbum().getName())
                        .PhotoId(null)
                        .imageUrl(null)
                        .build();
            } else {
                return AlbumListRes.toDto(photoAlbum1);
            }
        }).toList();
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
