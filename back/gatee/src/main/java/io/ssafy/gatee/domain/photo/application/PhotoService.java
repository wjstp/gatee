package io.ssafy.gatee.domain.photo.application;

import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.domain.photo.dto.response.PhotoDetailRes;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermission;

import java.util.UUID;

public interface PhotoService {
    PhotoDetailRes readPhotoDetail(Long photoId, UUID memberId);
    Long savePhoto(PhotoSaveReq photoSaveReq);
    void deletePhoto(Long memberFamilyId, Long photoId) throws DoNotHavePermission;
    void savePhotoReaction(UUID memberId, Long photoId);
    void deletePhotoReaction(UUID memberId, Long photoId);
}
