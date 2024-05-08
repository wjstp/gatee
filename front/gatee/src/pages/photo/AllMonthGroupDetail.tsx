import React from 'react';
import PhotoList from "@components/PhotoList";
import {useOutletContext, useParams} from "react-router-dom";
import {photoGroup} from "@constants/index";
import {PhotoOutletInfoContext} from "@type/index";

const PhotoAllMonthGroupDetail = () => {

  const params = useParams()
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();

  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년 {params.month}월
      </div>
      <PhotoList editMode={editMode} photoGroup={photoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAllMonthGroupDetail;