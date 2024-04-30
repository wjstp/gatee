import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import {usePhotoStore} from "@store/usePhotoStore";
// import sampleImage from "@assets/images/schedule/calendarBanner3.jpg"
import Checkbox from '@mui/material/Checkbox';

// 사진 그룹 타입
interface PhotoListProps {
  photoGroup: {
    id: number,
    dateTime: string,
    src: string
  }[]
}

// 채팅 앨범과 모든 사진의 일별 사진, 월별 연별 앨범 사진 상세페이지에서 활용됨
const PhotoList = ({photoGroup}: PhotoListProps) => {
  const {isEdit} = usePhotoStore()
  const label = {inputProps: {'aria-label': 'Checkbox demo'}};
  const navigate = useNavigate();
  const gotoDetail = () => {
    if (isEdit === false) {
      navigate("/photo/1")
    }
  }
  return (
    <div className="photo__item__list-container">
      {/* 사진 묶음 - 3개씩 보여주기 */}
      {photoGroup.map((item: any, index) => {
        return (
          <div onClick={gotoDetail} className="photo__item"
               key={index}>
            {isEdit ?
              <Checkbox {...label} className="check-box"/>
              :
              null}
            <img src={item.src} alt=""/>
          </div>)
      })}

    </div>
  )

}

export default PhotoList;