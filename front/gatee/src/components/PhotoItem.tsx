import React from 'react';
import samplePhoto from "@assets/images/schedule/bg_calendar_banner1.jpg";
import samplIcon1 from "@assets/images/signup/dad.svg";
import samplIcon2 from "@assets/images/signup/daughter.svg";
import {CiHeart} from "react-icons/ci";
import {MdOutlineFileDownload} from "react-icons/md";

const PhotoItem = () => {
  const photoData = {
    liked: ["아빠", "언니"],
    src: samplePhoto
  }
  const profileData = [
    {
      nickname: "아빠",
      icon: samplIcon1
    },
    {
      nickname: "언니",
      icon: samplIcon2
    },
  ]
  return (
    <div className="photo-detail--container">
      <img src={photoData.src} alt="asa"/>
      <div className="interaction--container">
        <div className="liked--container">
          <CiHeart size={40}/>
          <div className="liked-profiles--container">
            {profileData.map((item, index) => {
              return <img key={index} className="liked-icon" src={item.icon} alt=""/>
            })}
          </div>
        </div>
        <MdOutlineFileDownload size={30}/>
      </div>

    </div>

  )
}

export default PhotoItem;