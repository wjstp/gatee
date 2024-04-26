package io.ssafy.gatee.domain.album.application;

import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.global.exception.error.not_found.AlbumNotFoundException;

import java.util.List;

public interface AlbumService {
    //    List<AlbumListRes> readAlbumList(Long familyId) throws AlbumNotFoundException;
//    List<PhotoListRes> readAlbumDetail()
    Long saveAlbum(AlbumSaveReq albumSaveReq);
    void editAlbumName(Long albumId, String name);

    void deleteAlbum(Long albumId);
}
