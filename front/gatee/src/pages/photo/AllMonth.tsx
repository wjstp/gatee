import React, {useEffect} from 'react';
import {Link} from "react-router-dom";

import {useFamilyStore} from "@store/useFamilyStore";
import {getThumbnailPhotoApi} from "@api/photo";
import {MonthYearPhotoTabProps} from "@type/index";
import {usePhotoStore} from "@store/usePhotoStore";


const AllMonth = () => {
  const {familyId} = useFamilyStore()
  const {monthThumbnailPhotoGroup,setMonthThumbnailPhotoGroup} = usePhotoStore()
  useEffect(() => {
    // 월별 사진 조회
    getThumbnailPhotoApi({familyId: familyId, filter: "MONTH"},
      res => {
        console.log(res)
        setMonthThumbnailPhotoGroup(res.data)
      },
      err => {
        console.log(err)
      })
  }, [])

  // 년도별로 그룹화할 객체 생성
  const groupedByYear: { [year: string]: any[] } = {};

// 데이터 배열을 년도별로 그룹화
  monthThumbnailPhotoGroup.forEach(item => {
    const year = item?.createdAt?.substring(0, 4); // 년도 추출
    if (!groupedByYear[year]) {
      groupedByYear[year] = []; // 년도별 그룹이 없으면 배열을 생성
    }
    groupedByYear[year].push(item); // 년도별 그룹에 아이템 추가
  });

  return (
    <div className="month-photo-container">
      {Object.keys(groupedByYear)
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map(year => (
          <React.Fragment key={year}>
            <div className="detail-tab--title">{year}년</div>
            {groupedByYear[year].map((monthYearPhotoData) => (
              <MonthItem key={monthYearPhotoData.createdAt} monthYearPhotoData={monthYearPhotoData}/>
            ))}
          </React.Fragment>
        ))}

    </div>
  );
};

const MonthItem = ({monthYearPhotoData}: MonthYearPhotoTabProps) => {
  const dateString = monthYearPhotoData.createdAt
  const createdAt = new Date(dateString);
  // 현재의 년도 추출
  const year = createdAt.getFullYear();

// 현재의 월 추출 (0부터 시작하므로 +1을 해줘야 함)
  const month = createdAt.getMonth() + 1;

  return (
    <Link to={`${year}/${month}`} className="month-photo-item--container">
      {/* 월 표시 */}
      <div className="month">{month}월</div>
      {/* 배경 사진 */}
      <img className="photo" src={monthYearPhotoData.imageUrl} alt={`${monthYearPhotoData.photoId}`}/>
    </Link>
  )
}

export default AllMonth;