package io.ssafy.gatee.domain.album.application;

import io.ssafy.gatee.domain.album.dao.AlbumRepository;
import io.ssafy.gatee.domain.album.dto.request.AddAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.request.DeleteAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumSaveRes;
import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.photo.dao.PhotoRepository;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.domain.photo_album.dao.PhotoAlbumRepository;
import io.ssafy.gatee.domain.photo_album.dao.PhotoAlbumRepositoryCustom;
import io.ssafy.gatee.domain.photo_album.entity.PhotoAlbum;
import io.ssafy.gatee.global.exception.error.not_found.AlbumNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.ALBUM_NOT_FOUND;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;

    private final FamilyRepository familyRepository;

    private final PhotoRepository photoRepository;

    private final PhotoAlbumRepository photoAlbumRepository;

    private final PhotoAlbumRepositoryCustom photoAlbumRepositoryCustom;

    //    앨범 목록 조회
    @Override
    public List<AlbumListRes> readAlbumList(UUID familyId) throws AlbumNotFoundException {
        Family family = familyRepository.getReferenceById(familyId);

        List<Album> albumList = albumRepository.findAllByFamily(family)
                .orElseThrow(() -> new AlbumNotFoundException(ALBUM_NOT_FOUND));

        return photoAlbumRepositoryCustom.findAlbumThumbnailByAlbum(albumList);
    }

    // 앨범 상세 조회
    @Override
    public List<AlbumPhotoListRes> readAlbumDetail(Long albumId) {
        Album album = albumRepository.getReferenceById(albumId);

        return photoAlbumRepositoryCustom.findPhotoByAlbum(album);
    }

    // 앨범 생성
    @Override
    @Transactional
    public AlbumSaveRes saveAlbum(AlbumSaveReq albumSaveReq) {
        Family family = familyRepository.getReferenceById(albumSaveReq.familyId());

        Album album = Album.builder()
                .name(albumSaveReq.name())
                .family(family)
                .build();

        albumRepository.save(album);

        return AlbumSaveRes.builder()
                .albumId(album.getId())
                .build();
    }

    // 앨범 이름 수정
    @Override
    @Transactional
    public void editAlbumName(Long albumId, String name) {
        Album album = albumRepository.getReferenceById(albumId);

        album.changeName(name);
    }

    // 앨범 삭제
    @Override
    @Transactional
    public void deleteAlbum(Long albumId) {
        Album album = albumRepository.getReferenceById(albumId);

        album.deleteData();

        photoAlbumRepository.updatePhotoAlbumStatus(albumId);
    }

    // 앨범 내 사진 추가
    @Override
    @Transactional
    public List<AlbumPhotoListRes> addAlbumPhotoList(Long albumId, AddAlbumPhotoListReq addAlbumPhotoListReq) {
        Album album = albumRepository.getReferenceById(albumId);

        List<Photo> photoList = addAlbumPhotoListReq.photoIdList().stream().map(photoRepository::getReferenceById).toList();

        // 반환 값이 필요 없지만 stream.map 을 사용하여 반복문 구조를 사용하기 위해서 사용 (추후 수정 필요)
        List<PhotoAlbum> photoAlbumList = photoList.stream()
                .map(photo -> PhotoAlbum.builder()
                        .photo(photo)
                        .album(album)
                        .build()).toList();

        photoAlbumRepository.saveAll(photoAlbumList);

        return photoAlbumRepositoryCustom.findPhotoByAlbum(album);
    }

    // 앨범 내 사진 삭제
    @Override
    @Transactional
    public List<AlbumPhotoListRes> deleteAlbumPhotoList(Long albumId, DeleteAlbumPhotoListReq deleteAlbumPhotoListReq) {

        Album album = albumRepository.getReferenceById(albumId);

        photoAlbumRepository.deleteAllById(deleteAlbumPhotoListReq.photoAlbumIdList());

        return photoAlbumRepositoryCustom.findPhotoByAlbum(album);
    }
}
