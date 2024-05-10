import React, {useEffect, useState} from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import {PhotoOutletInfoContext} from "@type/index";
import {getAlbumDetailApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import PhotoList from "@components/PhotoList";
import {photoGroup} from "@constants/index";

const PhotoAlbumGroupDetail = () => {
  const params = useParams()
  const {familyId} = useFamilyStore()
  const [albumName,setAlbumName] = useState<string>('예삐')
  useEffect(() => {
    if (params?.id){
      getAlbumDetailApi(
        params?.id,
        {familyId:familyId},
        res => {
          console.log(res)
          // setAlbumName
        },
        err=>{}
      )

    }

  }, [params]);
  // const albumName ="예빈"
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  return (
    <div>
      <div className="detail-tab--title">
        {albumName}
      </div>
      <PhotoList editMode={editMode} photoGroup={photoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAlbumGroupDetail;