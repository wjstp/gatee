package io.ssafy.gatee.domain.photo.api;

import io.ssafy.gatee.domain.photo.application.PhotoService;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.domain.photo.dto.response.PhotoDetailRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.bad_request.WrongTypeFilterException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/photos")
@RequiredArgsConstructor
public class PhotoController {
    private final PhotoService photoService;

    // 사진 목록 조회 (QueryDSL 구현)
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<PhotoListRes> readPhotoList(
            @Valid
            @RequestBody PhotoListReq photoListReq
    ) throws WrongTypeFilterException {
        return photoService.readPhotoList(photoListReq);
    }

    // 사진 상세 조회
    @GetMapping("/{photoId}")
    @ResponseStatus(HttpStatus.OK)
    public PhotoDetailRes readPhotoDetail(
            @PathVariable("photoId") Long photoId,
            @RequestParam UUID memberId
    ) {
        return photoService.readPhotoDetail(photoId, memberId);
    }

    // 사진 등록
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.OK)
    public Long savePhoto(@Valid @RequestBody PhotoSaveReq photoSaveReq) {
        return photoService.savePhoto(photoSaveReq);
    }

    // 사진 삭제
    @DeleteMapping("/{photoId}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePhoto(
            @Valid
            @RequestParam Long memberFamilyId,
            @PathVariable("photoId") Long photoId
    ) throws DoNotHavePermissionException {
        photoService.deletePhoto(memberFamilyId, photoId);
    }

    // 사진 상호작용 생성
    @PostMapping("/{photoId}/reaction")
    @ResponseStatus(HttpStatus.OK)
    public void savePhotoReaction(
            @Valid
            @RequestParam UUID memberId,
            @PathVariable("photoId") Long photoId
    ) {
        photoService.savePhotoReaction(memberId, photoId);
    }

    // 사진 상호작용 취소
    @DeleteMapping("/{photoId}/reaction")
    @ResponseStatus(HttpStatus.OK)
    public void deletePhotoReaction(
            @Valid
            @RequestParam UUID memberId,
            @PathVariable("photoId") Long photoId
    ){
        photoService.deletePhotoReaction(memberId, photoId);
    }
}
