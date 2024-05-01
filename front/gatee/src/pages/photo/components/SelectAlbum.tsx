import React from "react";
import {id} from "date-fns/locale";

export const SelectAlbumModal = ({handleSelectAlbum}: { handleSelectAlbum?: (name: string, id: number) => void }) => {
  // 앨범 리스트
  const albumNameList = [
    {id: 1, name: "툔"},
    {id: 2, name: "예삐리리"},
    {id: 3, name: "운덩"},
  ]
  // 앨범 선택 이벤트
  const handleSelect = (event:React.MouseEvent<HTMLButtonElement>|React.MouseEvent<HTMLDivElement>,name: string, id: number) => {
    event.stopPropagation();

    if (handleSelectAlbum) { // handleSelectAlbum이 존재하는지 확인
      handleSelectAlbum(name, id);
    }
  }


  return (
    <div className="album-name-select-modal-bg"
          onClick={(event:React.MouseEvent<HTMLDivElement>)=>handleSelect(event,"",0)}>
      {/* 모달 내용 */}
      <div className="album-name-select-modal-content">
        <h3>앨범으로 이동</h3>
        {albumNameList.map((albumName, index) => {
          return (
            <button className="album-name-item"
                    onClick={(event:React.MouseEvent<HTMLButtonElement>) => handleSelect(event,albumName.name, albumName.id)}
                    key={index}> { albumName.name } </button>
          )
        })}
      </div>
    </div>
  );

}