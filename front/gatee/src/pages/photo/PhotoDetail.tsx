import React, {useEffect, useState} from 'react';
import PhotoItem from "@components/PhotoItem";
import {getDetailPhotoApi} from "@api/photo";
import {useParams} from "react-router-dom";


const PhotoDetail = () => {

  const [photoDetailData,setPhotoDetailData] = useState({
    "photoId" : 1,
    "imageUrl" : "https://www.gaty.duckdns.org/s3-image-url-2\"",
    "reactionList" : [ {
      "memberId" : "eb5eaaa7-e5ee-4a41-b36f-0dba0edb3508",
      "content" : "reaction1"
    }, {
      "memberId" : "6f17e1ac-2bf0-4567-a916-e815e5818711",
      "content" : "reaction2"
    } ],
    "isReaction" : false
  })

  const params = useParams()

  useEffect(() => {
    // 사진 상세 Api
    if (params.id) {
      getDetailPhotoApi(params.id,
        res => {
          console.log(res.data)
          setPhotoDetailData(res.data)
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