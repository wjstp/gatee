import React, {useEffect} from 'react';
import PhotoItem from "@components/PhotoItem";
import samplePhoto from "@assets/images/schedule/bg_calendar_banner1.jpg";
import {getDetailPhotoApi} from "@api/photo";
import {useParams} from "react-router-dom";


const PhotoDetail = () => {

  const photoDetailData = {
    liked: ["아빠", "언니"],
    src: samplePhoto
  }

  const params = useParams()

  useEffect(() => {
    // 사진 상세 Api
    if (params.id) {
      getDetailPhotoApi(params.id,
        res => {
          console.log(res)
        },
        err => {
          console.log(err)
        })
    }
  }, [params]);
  return (
    <div className="photo-detail">
      <PhotoItem photoDetailData={photoDetailData}/>
    </div>
  );
};


export default PhotoDetail;