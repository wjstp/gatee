import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useFamilyStore} from "@store/useFamilyStore";
import {getThumnailPhotoApi} from "@api/photo";


interface MonthYearThumbnailPhotoData {
  createdAt: string,
  imageUrl: string,
  photoId: number
}

interface MonthYearPhotoTabProps {
  yearPhotoData: MonthYearThumbnailPhotoData
}

const AllYear = () => {
  const {familyId} = useFamilyStore()
  const [yearPhotoDatas, setYearPhotoDatas] = useState<MonthYearThumbnailPhotoData[]>([])

  useEffect(() => {
    // 월별 사진 조회
    getThumnailPhotoApi({familyId: familyId, filter: "YEAR"},
      res => {
        console.log(res)
        setYearPhotoDatas(res.data)
      },
      err => {
        console.log(err)
      })
  }, [])
  return (
    <div className="year-photo-container">
      {/* 주어진 데이터 정렬로 return */}
      {yearPhotoDatas.map((yearPhotoData, index) => {
        return <YearItem key={index} yearPhotoData={yearPhotoData}/>
      })
      }

    </div>
  );
};

const YearItem = ({yearPhotoData}: MonthYearPhotoTabProps) => {
  const dateString = yearPhotoData.createdAt
  const createdAt = new Date(dateString);
  // 현재의 년도 추출
  const year = createdAt.getFullYear();

  return (
    <Link to={`${year}`} className="year-photo-item--container">
      {/* 연 표시 */}
      <div className="year">{year}년</div>
      {/* 배경 사진 */}
      <img className="photo" src={yearPhotoData.imageUrl} alt={`${yearPhotoData.photoId}`}/>
    </Link>
  )
}

export default AllYear;