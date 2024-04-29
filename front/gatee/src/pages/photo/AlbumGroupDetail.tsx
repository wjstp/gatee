import React from 'react';
import PhotoList from "@components/PhotoList";
import {photoGroup} from "../../constants";
import {useParams} from "react-router-dom";

const PhotoAlbumGroupDetail = () => {
    const params = useParams()
    const id = params.id
    const albumName = "예빈"
    return (
        <div>
            <div className="detail-tab--title">
                {albumName}
            </div>
            <PhotoList photoGroup={photoGroup}/>
        </div>
    );
}

export default PhotoAlbumGroupDetail;