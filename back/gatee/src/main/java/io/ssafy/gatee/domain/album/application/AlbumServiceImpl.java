package io.ssafy.gatee.domain.album.application;

import io.ssafy.gatee.domain.album.dao.AlbumRepository;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.global.exception.error.not_found.AlbumNotFoundException;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService {

    private final AlbumRepository albumRepository;

    private final FamilyRepository familyRepository;


    // 앨범 목록 조회
//    @Override
//    public List<AlbumListRes> readAlbumList(Long familyId) throws AlbumNotFoundException {
//        Family family = familyRepository.getReferenceById(familyId);
//
//        List<Album> albumList = albumRepository.findAllByFamily(family)
//                .orElseThrow(() -> new AlbumNotFoundException(ALBUM_NOT_FOUND));
//
////        return albumList.stream().map((album -> )).toList();
//        return null;
//    }

    // 앨범 상세 조회

    // 앨범 생성
    @Override
    @Transactional
    public Long saveAlbum(AlbumSaveReq albumSaveReq) {
        Family family = familyRepository.getReferenceById(albumSaveReq.familyId());

        Album album = Album.builder()
                .name(albumSaveReq.name())
                .family(family)
                .build();

        albumRepository.save(album);

        return album.getId();
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
    }
}
