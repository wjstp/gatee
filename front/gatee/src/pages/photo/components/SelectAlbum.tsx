import React from "react";
import {usePhotoStore} from "@store/usePhotoStore";


export const SelectAlbumModal = ({handleSelectAlbum}: { handleSelectAlbum?: (name: string, id: number) => void }) => {
  // 앨범 리스트
  const {albumList} = usePhotoStore()

  // 앨범 선택 이벤트
  const handleSelect = (event:React.MouseEvent<HTMLButtonElement>|React.MouseEvent<HTMLDivElement>,name: string, albumId: number) => {
    event.stopPropagation();

    if (handleSelectAlbum) { // handleSelectAlbum이 존재하는지 확인
      handleSelectAlbum(name, albumId);
    }
  }


  return (
    <div className="album-name-select-modal-bg"
          onClick={(event:React.MouseEvent<HTMLDivElement>)=>handleSelect(event,"",0)}>
      {/* 모달 내용 */}
      <div className="album-name-select-modal-content">
        <h3>앨범으로 이동</h3>
        <div className="album-name-list--container">
          {albumList.length===0 ?
          <p className="no-content">앨범이 없습니다</p>
            :
            null
          }
        {albumList.map((albumName, index) => {
          return (
            <button className="album-name-item"
                    onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleSelect(event,albumName.name, albumName.albumId)}
                    key={index}>
              <p className="album-name-title">{ albumName.name } </p>
            </button>
          )
        })}
      </div>
      </div>
    </div>
  );

}