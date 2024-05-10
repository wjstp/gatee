import React, {useEffect, useState} from "react";
import {getAlbumListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import {GroupPhotoData} from "@type/index";


export const SelectAlbumModal = ({handleSelectAlbum}: { handleSelectAlbum?: (name: string, id: number) => void }) => {
  const {familyId} =useFamilyStore()
  // 앨범 리스트
  const [albumNameList,setAlbumNameList] = useState<GroupPhotoData[]>([])

  const getAlbumListApiFunc = () => {
    getAlbumListPhotoApi(
      {familyId: familyId},
      res => {
        console.log(res)
        setAlbumNameList(res.data)
      },
      err => {
        console.log(err)
      }
    )
  }
  // 앨범 선택 이벤트
  const handleSelect = (event:React.MouseEvent<HTMLButtonElement>|React.MouseEvent<HTMLDivElement>,name: string, albumId: number) => {
    event.stopPropagation();

    if (handleSelectAlbum) { // handleSelectAlbum이 존재하는지 확인
      handleSelectAlbum(name, albumId);
    }
  }


  useEffect(() => {
    getAlbumListApiFunc()
  }, []);
  return (
    <div className="album-name-select-modal-bg"
          onClick={(event:React.MouseEvent<HTMLDivElement>)=>handleSelect(event,"",0)}>
      {/* 모달 내용 */}
      <div className="album-name-select-modal-content">
        <h3>앨범으로 이동</h3>
        {albumNameList.map((albumName, index) => {
          return (
            <button className="album-name-item"
                    onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleSelect(event,albumName.name, albumName.albumId)}
                    key={index}> { albumName.name } </button>
          )
        })}
      </div>
    </div>
  );

}