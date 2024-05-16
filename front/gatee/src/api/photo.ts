import localAxios from "@api/LocalAxios";
import {AxiosError, AxiosResponse, AxiosInstance} from "axios";
import {
  CreateAlbumApiReq, DeletePhotoApiReq,
  FamilyIdReq,
  GetListPhotoApiReq,
  GetThumnailPhotoApiReq, UpdateAlbumNameApiReq, UploadAlbumPhotoApiReq,
  UploadPhotoApiReq
} from "@type/index";

const local: AxiosInstance = localAxios("default");


// 사진 업로드
export const uploadPhotoApi = async function (data: UploadPhotoApiReq,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.post("/photos/save", data).then(success).catch(fail);
}

// 사진 상세 조회
export const getDetailPhotoApi = async function (data: string | number,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.get(`/photos/${data}`).then(success).catch(fail);
}

// 모든 사진 목록 조회
export const getListPhotoApi = async function (data: GetListPhotoApiReq,
                                               success: (res: AxiosResponse<any>) => void,
                                               fail: (err: AxiosError<any>) => void) {
  await local.get(`/photos`, {params: data}).then(success).catch(fail);
}

// 앨범 목록 조회
export const getAlbumListPhotoApi = async function (data: FamilyIdReq,
                                                    success: (res: AxiosResponse<any>) => void,
                                                    fail: (err: AxiosError<any>) => void) {
  await local.get(`/albums` ,{params:data}).then(success).catch(fail);
}


// 년월 목록 썸네일 조회
export const getThumbnailPhotoApi = async function (data: GetThumnailPhotoApiReq,
                                                    success: (res: AxiosResponse<any>) => void,
                                                    fail: (err: AxiosError<any>) => void) {
  await local.get(`/photos/thumbnails` ,{params:data}).then(success).catch(fail);
}

// 앨범 상세 조회
export const getAlbumDetailApi = async function (albumId: string | number,
                                                 params: FamilyIdReq,
                                                 success: (res: AxiosResponse<any>) => void,
                                                 fail: (err: AxiosError<any>) => void) {
  await local.get(`/albums/${albumId}`, {params: params}).then(success).catch(fail);
}

// 앨범 생성
export const createAlbumApi = async function (data: CreateAlbumApiReq,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.post(`/albums`, data).then(success).catch(fail);
}


// 사진 삭제
export const deletePhotoApi = async function (data: DeletePhotoApiReq,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.patch(`photos/delete`,data).then(success).catch(fail);
}

// 사진 삭제
export const deleteDetailPhotoApi = async function (data: string|number,
                                              familyId:string,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.delete(`photos/${data}`,{params:familyId}).then(success).catch(fail);
}
// 앨범 삭제
export const deleteAlbumApi = async function (data: string|number,
                                              success: (res: AxiosResponse<any>) => void,
                                              fail: (err: AxiosError<any>) => void) {
  await local.delete(`albums/${data}`).then(success).catch(fail);
}

// 앨범 이름 수정
export const updateAlbumNameApi = async function (data: UpdateAlbumNameApiReq,
                                                  success: (res: AxiosResponse<any>) => void,
                                                  fail: (err: AxiosError<any>) => void) {

  await local.patch(`albums/${data.albumId}`, {name: data.name}).then(success).catch(fail);
}

// 앨범 내 사진 추가
export const uploadAlbumPhotoApi = async function (data: UploadAlbumPhotoApiReq,
                                                   success: (res: AxiosResponse<any>) => void,
                                                   fail: (err: AxiosError<any>) => void) {
  console.log(`albums/${data.albumId}/photos`)
  console.log(`photoIdList: ${data.photoIdList}`)
  await local.post(`albums/${data.albumId}/photos`, {photoIdList: data.photoIdList}).then(success).catch(fail);
}

// 앨범 내 사진 삭제
export const deleteAlbumPhotoApi = async function (data: UploadAlbumPhotoApiReq,
                                                   success: (res: AxiosResponse<any>) => void,
                                                   fail: (err: AxiosError<any>) => void) {
  await local.patch(`albums/${data.albumId}/photos`, {photoAlbumId: data.photoIdList}).then(success).catch(fail);
}

// 사진 상호작용 생성
export const createReactionPhotoApi = async function (data: string|number,
                                                success: (res: AxiosResponse<any>) => void,
                                                fail: (err: AxiosError<any>) => void) {
  await local.post(`photos/${data}/reaction`).then(success).catch(fail);
}

// 사진 상호작용 삭제
export const deleteReactionPhotoApi = async function (data: string|number,
                                                      success: (res: AxiosResponse<any>) => void,
                                                      fail: (err: AxiosError<any>) => void) {
  await local.delete(`photos/${data}/reaction`).then(success).catch(fail);
}
