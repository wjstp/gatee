import {create} from "zustand";
import {AlbumGroupDetail, GroupPhotoData, MonthYearThumbnailPhotoData, PhotoData} from "@type/index";

type PhotoStore = {
  showModal: boolean;
  setShowModal: (newShow: boolean) => void;
  detailPhotoGroup: PhotoData[];
  setDetailPhotoGroup: (newDetailPhotoGroup: PhotoData[]) => void,
  addPhotoToDetailPhotoGroup: (newPhoto: PhotoData) => void;
  removeDetailPhotosByPhotoIdList: (photoIdList: number[]) => void;
  monthThumbnailPhotoGroup: MonthYearThumbnailPhotoData[]
  setMonthThumbnailPhotoGroup: (newThumbnailPhotoGroup: MonthYearThumbnailPhotoData[]) => void,
  yearThumbnailPhotoGroup: MonthYearThumbnailPhotoData[]
  setYearThumbnailPhotoGroup: (newThumbnailPhotoGroup: MonthYearThumbnailPhotoData[]) => void,
  albumList: GroupPhotoData[];
  setAlbumList: (newAlbumList: GroupPhotoData[]) => void,
  addPhotoToAlbumList: (newPhoto: GroupPhotoData) => void;
  removePhotoByAlbumId: (albumIdToRemove: number) => void;
  detailAlbumPhotoGroup: AlbumGroupDetail[];
  setDetailAlbumPhotoGroup: (newDetailAlbumPhotoGroup: AlbumGroupDetail[]) => void,
  addPhotoToDetailAlbumPhotoGroup: (newPhoto: AlbumGroupDetail) => void;
  removeAlbumDetailPhotosByPhotoIdList: (photoAlbumIdToDelete: string | number) => void; // 예시로 string을 사용했습니다. 실제 타입에 맞게 수정해주세요.

}

export const usePhotoStore = create<PhotoStore>(
  (set) => ({
    showModal: false,
    setShowModal: (newShow: boolean) => set({showModal: newShow}),
    // 월, 년, 일 각 상세 사진
    detailPhotoGroup: [],
    // 새로 갈아끼기
    setDetailPhotoGroup: (newDetailPhotoGroup) => set({detailPhotoGroup: newDetailPhotoGroup}),

    // 사진 배열에 원소 추가하는 함수
    addPhotoToDetailPhotoGroup: (newPhoto: PhotoData) => {
      set((state) => ({
        detailPhotoGroup: [...state.detailPhotoGroup, newPhoto],
      }));
    },
    // 사진의 특정 photoId를 가지는 원소 삭제하는 함수
    removeDetailPhotosByPhotoIdList: (photoIdList: number[]) => {
      set((state) => ({
        detailPhotoGroup: state.detailPhotoGroup.filter((photo) => !photoIdList.includes(photo.photoId)),
      }));
    },
    // 월별 썸네일
    monthThumbnailPhotoGroup: [],
    setMonthThumbnailPhotoGroup: (newThumbnailPhotoGroup) => set({monthThumbnailPhotoGroup: newThumbnailPhotoGroup}),
    // 연별 썸네일
    yearThumbnailPhotoGroup: [],
    setYearThumbnailPhotoGroup: (newThumbnailPhotoGroup) => set({yearThumbnailPhotoGroup: newThumbnailPhotoGroup}),
    // 앨범 목록
    albumList: [],
    setAlbumList: (newAlbumList) => set({albumList: newAlbumList}),

    // 앨범 목록 배열에 원소를 추가하는 함수
    addPhotoToAlbumList: (newPhoto: GroupPhotoData) => {
      set((state) => ({
        albumList: [...state.albumList, newPhoto],
      }))
    },

    // 앨범 목록에서 특정 albumId를 가지는 원소들을 삭제하는 함수
    removePhotoByAlbumId: (albumIdToDelete) =>
      set((state) => ({
        albumList: state.albumList.filter(
          (albumList) => albumList.albumId !== albumIdToDelete
        ),
      })),

    // 앨범의 상세페이지
    detailAlbumPhotoGroup: [],
    setDetailAlbumPhotoGroup: (newDetailAlbumPhotoGroup) => set({detailAlbumPhotoGroup: newDetailAlbumPhotoGroup}),
    // 앨범의 상세 배열에 원소 추가하는 함수
    addPhotoToDetailAlbumPhotoGroup: (newPhoto: AlbumGroupDetail) => {
      set((state) => ({
        detailAlbumPhotoGroup: [...state.detailAlbumPhotoGroup, newPhoto],
      }));
    },
    // 앨범의 상세에서 특정 photoId를 가지는 원소 삭제하는 함수
    removeAlbumDetailPhotosByPhotoIdList: (photoAlbumIdToDelete) =>
      set((state) => ({
        detailAlbumPhotoGroup: state.detailAlbumPhotoGroup.filter(
          (detailAlbumPhotoGroup) => detailAlbumPhotoGroup.photoAlbumId !== photoAlbumIdToDelete
        ),
      })),
  })
);