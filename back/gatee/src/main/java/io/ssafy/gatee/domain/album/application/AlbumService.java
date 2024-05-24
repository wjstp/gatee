package io.ssafy.gatee.domain.album.application;

import io.ssafy.gatee.domain.album.dto.request.AddAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.request.DeleteAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumSaveRes;
import io.ssafy.gatee.global.exception.error.not_found.AlbumNotFoundException;

import java.util.List;
import java.util.UUID;

public interface AlbumService {

    List<AlbumListRes> readAlbumList(UUID familyId) throws AlbumNotFoundException;

    List<AlbumPhotoListRes> readAlbumDetail(Long albumId);

    AlbumSaveRes saveAlbum(AlbumSaveReq albumSaveReq);

    void editAlbumName(Long albumId, String name);

    void deleteAlbum(Long albumId);

    List<AlbumPhotoListRes> addAlbumPhotoList(Long albumId, AddAlbumPhotoListReq addAlbumPhotoListReqa);

    List<AlbumPhotoListRes> deleteAlbumPhotoList(Long albumId, DeleteAlbumPhotoListReq deleteAlbumPhotoListReq);
}
