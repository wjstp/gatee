import React from 'react';
import PhotoList from "@components/PhotoList";
import {useOutletContext, useParams} from "react-router-dom";
import {photoGroup} from "@constants/index";
import {PhotoOutletInfoContext} from "@type/index";

const PhotoAllYearGroupDetail = () => {
  const { editMode,handleChecked } = useOutletContext<PhotoOutletInfoContext>();

  const params = useParams()
  return (
    <div>
      <div className="detail-tab--title">
        {params.year}년
      </div>
      <PhotoList editMode={editMode} photoGroup={photoGroup} handleChecked={handleChecked}/>
    </div>
  );
}

export default PhotoAllYearGroupDetail;