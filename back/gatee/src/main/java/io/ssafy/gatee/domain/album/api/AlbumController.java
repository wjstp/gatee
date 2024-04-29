package io.ssafy.gatee.domain.album.api;

import io.ssafy.gatee.domain.album.application.AlbumService;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import io.ssafy.gatee.global.exception.error.not_found.AlbumNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/album")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    // 앨범 목록 조회
//    @GetMapping
//    @ResponseStatus(HttpStatus.OK)
//    public List<AlbumListRes> readAlbumList(
//            @Valid
//            @RequestParam Long familyId
//    ) throws AlbumNotFoundException {
//        return albumService.readAlbumList(familyId);
//    }

    // 앨범 상세 조회
//    @GetMapping("/{albumId}")
//    @ResponseStatus(HttpStatus.OK)
//    public List<PhotoListRes> readAlbumDetail (
//            @PathVariable("albumId") Long albumId
//    ) {
//
//    }

    // 앨범 생성
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public Long saveAlbum(
            @Valid
            @RequestBody AlbumSaveReq albumSaveReq
    ) {
        return albumService.saveAlbum(albumSaveReq);
    }

    // 앨범 이름 수정
    @PatchMapping("/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public void editAlbumName(
            @Valid
            @PathVariable("albumId") Long albumId,
            @RequestParam String name
    ) {
        albumService.editAlbumName(albumId, name);
    }

    // 앨범 내 사진 목록 수정

    // 앨범 삭제
    @DeleteMapping("/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAlbum(
            @PathVariable("albumId") Long albumId
    ) {
        albumService.deleteAlbum(albumId);
    }
}
