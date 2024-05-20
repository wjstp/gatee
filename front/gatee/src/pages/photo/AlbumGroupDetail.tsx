import React, {useEffect, useState} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import {PhotoOutletInfoContext} from "@type/index";
import {getAlbumDetailApi, updateAlbumNameApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import AlbumDetailPhotoList from "@pages/photo/components/AlbumDetailPhotoList";
import {usePhotoStore} from "@store/usePhotoStore";


const PhotoAlbumGroupDetail = () => {
  const params = useParams()
  const {familyId} = useFamilyStore()
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  const [albumName, setAlbumName] = useState<string>('')
  const {detailAlbumPhotoGroup,setDetailAlbumPhotoGroup} = usePhotoStore()
  // 이름 변경 api
  const changeAlbumNameApiFunc = (newName: string) => {
    if (params?.id) {
      updateAlbumNameApi(
        {
          albumId: params?.id,
          name: newName
        },
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        }
      )
    }

  }

  // 앨범 상세 불러오기 api
  const getAlbumDetailApiFunc = (id: string) => {
    getAlbumDetailApi(
      id,
      {familyId: familyId},
      res => {
        console.log(res)
        setDetailAlbumPhotoGroup(res.data);

      },
      err => {
        console.log(err)
      }
    )
  }

  // 마운트 되자마자 앨범 이름과 앨범 상세 데이터 가져오기
  useEffect(() => {
    if (params?.id && params?.name) {
      setAlbumName(params?.name)
      getAlbumDetailApiFunc(params.id)
    }
  }, [params]);

  return (
    <div>
      {editMode !== "editName" ?
        <div className="detail-tab--title">
          {albumName}
        </div>
        :
        <input type="text"
               className="detail-tab--title--edited"
               onBlur={() => changeAlbumNameApiFunc(albumName)}
               value={albumName}
               autoFocus
               onChange={(e) => setAlbumName(e.target.value)}

        />

      }

      <AlbumDetailPhotoList editMode={editMode} photoGroup={detailAlbumPhotoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAlbumGroupDetail;