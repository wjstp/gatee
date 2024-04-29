import React from 'react';
import PhotoList from "@components/PhotoList";
import {useParams} from "react-router-dom";
import {photoGroup} from "../../constants";

const PhotoAllMonthGroupDetail = () => {

  const params = useParams()


  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년 {params.month}월
      </div>
      <PhotoList photoGroup={photoGroup}/>
    </div>
  );
}

export default PhotoAllMonthGroupDetail;