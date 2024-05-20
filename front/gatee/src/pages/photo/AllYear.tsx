import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {useFamilyStore} from "@store/useFamilyStore";
import {getThumbnailPhotoApi} from "@api/photo";
import {MonthYearPhotoTabProps} from "@type/index";
import {usePhotoStore} from "@store/usePhotoStore";




const AllYear = () => {
  const {familyId} = useFamilyStore()
  const {yearThumbnailPhotoGroup,setYearThumbnailPhotoGroup} = usePhotoStore()
  // 월별 불러오기
  const getMonthThumnailPhotoApiFunc = () => {
    // 월별 사진 조회
    getThumbnailPhotoApi({familyId: familyId, filter: "YEAR"},
      res => {
        console.log(res)
        setYearThumbnailPhotoGroup(res.data)
      },
      err => {
        console.log(err)
      })
  }
  useEffect(() => {
    getMonthThumnailPhotoApiFunc()
  }, [])
  return (
    <div className="year-photo-container">
      {/* 주어진 데이터 정렬로 return */}
      {yearThumbnailPhotoGroup.map((monthYearPhotoData, index) => {
        return <YearItem key={index} monthYearPhotoData={monthYearPhotoData}/>
      })
      }

    </div>
  );
};

const YearItem = ({monthYearPhotoData}: MonthYearPhotoTabProps) => {
  const dateString = monthYearPhotoData.createdAt
  const createdAt = new Date(dateString);
  // 현재의 년도 추출
  const year = createdAt.getFullYear();

  return (
    <Link to={`${year}`} className="year-photo-item--container">
      {/* 연 표시 */}
      <div className="year">{year}년</div>
      {/* 배경 사진 */}
      <img className="photo" src={monthYearPhotoData.imageUrl} alt={`${monthYearPhotoData.photoId}`}/>
    </Link>
  )
}

export default AllYear;