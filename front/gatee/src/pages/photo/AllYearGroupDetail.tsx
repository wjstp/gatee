import React from 'react';
import PhotoList from "@components/PhotoList";
import {useParams} from "react-router-dom";
import {photoGroup} from "../../constants";

const PhotoAllYearGroupDetail = () => {


  const params = useParams()
  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년
      </div>
      <PhotoList photoGroup={photoGroup}/>
    </div>
  );
}

export default PhotoAllYearGroupDetail;