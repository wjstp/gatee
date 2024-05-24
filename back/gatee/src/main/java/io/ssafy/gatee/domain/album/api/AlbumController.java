package io.ssafy.gatee.domain.album.api;

import io.ssafy.gatee.domain.album.application.AlbumService;
import io.ssafy.gatee.domain.album.dto.request.AddAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.request.DeleteAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumSaveRes;
import io.ssafy.gatee.global.exception.error.not_found.AlbumNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/albums")
@RequiredArgsConstructor
public class AlbumController {

    private final AlbumService albumService;

    //     앨범 목록 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<AlbumListRes> readAlbumList(
            @Valid
            @RequestParam UUID familyId
    ) throws AlbumNotFoundException {
        return albumService.readAlbumList(familyId);
    }

    //    앨범 상세 조회
    @GetMapping("/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public List<AlbumPhotoListRes> readAlbumDetail(
            @PathVariable("albumId") Long albumId
    ) {
        return albumService.readAlbumDetail(albumId);
    }

    // 앨범 생성
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public AlbumSaveRes saveAlbum(
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

    // 앨범 삭제
    @DeleteMapping("/{albumId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteAlbum(
            @PathVariable("albumId") Long albumId
    ) {
        albumService.deleteAlbum(albumId);
    }

    // 앨범 내 사진 추가
    @PostMapping("/{albumId}/photos")
    @ResponseStatus(HttpStatus.OK)
    public List<AlbumPhotoListRes> addAlbumPhotoList(
            @Valid
            @PathVariable("albumId") Long albumId,
            @RequestBody AddAlbumPhotoListReq addAlbumPhotoListReq
    ) {
        return albumService.addAlbumPhotoList(albumId, addAlbumPhotoListReq);
    }

    // 앨범 내 사진 삭제
    @PatchMapping("/{albumId}/photos")
    @ResponseStatus(HttpStatus.OK)
    public List<AlbumPhotoListRes> deleteAlbumPhotoList(
            @Valid
            @PathVariable("albumId") Long albumId,
            @RequestBody DeleteAlbumPhotoListReq deleteAlbumPhotoListReq
    ) {
        return albumService.deleteAlbumPhotoList(albumId, deleteAlbumPhotoListReq);
    }
}
