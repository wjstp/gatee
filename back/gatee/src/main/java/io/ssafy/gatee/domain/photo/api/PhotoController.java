package io.ssafy.gatee.domain.photo.api;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.photo.application.PhotoService;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListDeleteReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.domain.photo.dto.response.PhotoDetailRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoSaveRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoThumbnailRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.bad_request.WrongTypeFilterException;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Nullable;
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
            @RequestParam String familyId,
            @RequestParam String filter,
            @RequestParam @Nullable String year,
            @RequestParam @Nullable String month
    ) throws WrongTypeFilterException {
        return photoService.readPhotoList(PhotoListReq.builder()
                .familyId(familyId)
                .filter(filter)
                .year(year)
                .month(month)
                .build());
    }

    // 월별 썸네일 이미지 조회
    @GetMapping("/thumbnails")
    @ResponseStatus(HttpStatus.OK)
    public List<PhotoThumbnailRes> readPhotoThumbnailList(
            @RequestParam String filter,
            @RequestParam String familyId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return photoService.readPhotoThumbnailList(filter, UUID.fromString(familyId), customUserDetails.getMemberId());
    }

    // 사진 상세 조회
    @GetMapping("/{photoId}")
    @ResponseStatus(HttpStatus.OK)
    public PhotoDetailRes readPhotoDetail(
            @PathVariable("photoId") Long photoId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return photoService.readPhotoDetail(photoId, customUserDetails.getMemberId());
    }

    // 사진 등록
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.OK)
    public PhotoSaveRes savePhoto(
            @Valid
            @RequestBody PhotoSaveReq photoSaveReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws FirebaseMessagingException {
        return photoService.savePhoto(photoSaveReq, customUserDetails.getMemberId());
    }

    // 사진 삭제
    @DeleteMapping("/{photoId}")
    @ResponseStatus(HttpStatus.OK)
    public void deletePhoto(
            @RequestParam String familyId,
            @PathVariable("photoId") Long photoId,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) throws DoNotHavePermissionException {
        photoService.deletePhoto(UUID.fromString(familyId), photoId, customUserDetails.getMemberId());
    }

    // 사진 삭제 (리스트)
    @PatchMapping("/delete")
    @ResponseStatus(HttpStatus.OK)
    public void deletePhotoList(
            @Valid
            @RequestBody PhotoListDeleteReq photoListDeleteReq
    ) {
        photoService.deletePhotoList(photoListDeleteReq);
    }

    // 사진 상호작용 생성
    @PostMapping("/{photoId}/reaction")
    @ResponseStatus(HttpStatus.OK)
    public void savePhotoReaction(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("photoId") Long photoId
    ) {
        photoService.savePhotoReaction(customUserDetails.getMemberId(), photoId);
    }

    // 사진 상호작용 취소
    @DeleteMapping("/{photoId}/reaction")
    @ResponseStatus(HttpStatus.OK)
    public void deletePhotoReaction(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("photoId") Long photoId
    ) {
        photoService.deletePhotoReaction(customUserDetails.getMemberId(), photoId);
    }
}
