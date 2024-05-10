import React from 'react';
import PhotoList from "@components/PhotoList";
import {photoGroup} from "@constants/index";
import {useOutletContext, useParams} from "react-router-dom";
import {PhotoOutletInfoContext} from "@type/index";

const PhotoAlbumGroupDetail = () => {
  const params = useParams()
  // const id = params.id
  const albumName = "예빈"
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  return (
    <div>
      <div className="detail-tab--title">
        {albumName}
      </div>
      {/*<PhotoList editMode={editMode} photoGroup={photoGroup} handleChecked={handleChecked}/>*/}
    </div>
  );
}

export default PhotoAlbumGroupDetail;