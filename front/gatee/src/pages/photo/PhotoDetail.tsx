import React from 'react';
// import SamplePhoto1 from "@assets/images/schedule/bg_calendar_banner1.jpg"
import PhotoItem from "@components/PhotoItem";
// import samplePhoto from "@assets/images/schedule/bg_calendar_banner1.jpg";


const PhotoDetail = () => {
  const photoDetailData = {
    liked: ["아빠", "언니"],
    src: "@assets/images/schedule/bg_calendar_banner1.jpg"
  }
  return (
    <div className="photo-detail">
        <PhotoItem photoDetailData={photoDetailData}/>
    </div>
  );
};



export default PhotoDetail;