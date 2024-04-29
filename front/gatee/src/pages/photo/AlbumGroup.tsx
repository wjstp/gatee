import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";

interface GroupPhotoItemProps {
  groupPhotoData: {
    id: number,
    title: string,
    dateTime: string,
    src: string
  }
}

interface PlusAlbumButton {
  handleModal: () => void;
}


const PhotoAlbum = () => {

  const [showModal, setShowModal] = useState(false);
  // 월별 대표 사진 샘플 데이터
  const groupPhotoDatas = [
    {id: 1, title: "툔", dateTime: "2024-01-31T12:00:00", src: "@assets/images/schedule/calendarBanner3.jpg"},
    {id: 2, title: "예삐리리", dateTime: "2024-02-28T12:00:00", src: "@assets/images/schedule/calendarBanner4.jpg"},
    {id: 3, title: "운덩", dateTime: "2024-03-31T12:00:00", src: "@assets/images/schedule/calendarBanner5.jpg"},
  ]

  const handleModal = () => {
    setShowModal(!showModal);
    console.log("모달 팝업")
  }

  return (
    <div className="photo-group--container">
      {groupPhotoDatas.map((groupPhotoData, index) => {
        return <GroupItem key={index} groupPhotoData={groupPhotoData}/>
      })}
      <PlusAlbum handleModal={handleModal}/>
    </div>
  )
}

const GroupItem = ({groupPhotoData}: GroupPhotoItemProps) => {

  return (
    <Link to={`${groupPhotoData.id}`} className="photo-group--item--container">
      {/* 배경 사진 */}
      <img className="photo" src={groupPhotoData.src} alt={`${groupPhotoData.id}`}/>
      <p className="title">{groupPhotoData.title}</p>
    </Link>
  )
}


const PlusAlbum = ({handleModal}:PlusAlbumButton) => {

  return (
    <div className="photo-group--item--container">
      {/* 배경 사진 */}
      <div onClick={handleModal} className="plus-album--button-container">
        <FaPlus className="plus-button" size={50}/>
      </div>
      <div className="title text-white">
        추가하기
      </div>

    </div>
  )
}
export default PhotoAlbum;