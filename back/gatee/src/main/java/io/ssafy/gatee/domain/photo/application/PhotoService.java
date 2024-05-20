package io.ssafy.gatee.domain.photo.application;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListDeleteReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.domain.photo.dto.response.PhotoDetailRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoSaveRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoThumbnailRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.bad_request.WrongTypeFilterException;

import java.util.List;
import java.util.UUID;

public interface PhotoService {
    List<PhotoListRes> readPhotoList(PhotoListReq photoListReq) throws WrongTypeFilterException;
    List<PhotoThumbnailRes> readPhotoThumbnailList(String filter, UUID familyId, UUID memberId);
    PhotoDetailRes readPhotoDetail(Long photoId, UUID memberId);
    PhotoSaveRes savePhoto(PhotoSaveReq photoSaveReq, UUID memberId) throws FirebaseMessagingException;
    void deletePhoto(UUID familyId, Long photoId, UUID memberId) throws DoNotHavePermissionException;
    void deletePhotoList(PhotoListDeleteReq photoListDeleteReq);
    void savePhotoReaction(UUID memberId, Long photoId);
    void deletePhotoReaction(UUID memberId, Long photoId);
}
