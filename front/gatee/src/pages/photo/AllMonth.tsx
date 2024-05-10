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
  monthPhotoData: MonthYearThumbnailPhotoData
}

const AllMonth = () => {
  const {familyId} = useFamilyStore()
  const [monthPhotoDatas, setMonthPhotoDatas] = useState<MonthYearThumbnailPhotoData[]>([]);
  useEffect(() => {
    // 월별 사진 조회
    getThumnailPhotoApi({familyId: familyId, filter: "MONTH"},
      res => {
        console.log(res)
        setMonthPhotoDatas(res.data)
      },
      err => {
        console.log(err)
      })
  }, [])

  // 년도별로 그룹화할 객체 생성
  const groupedByYear: { [year: string]: any[] } = {};

// 데이터 배열을 년도별로 그룹화
  monthPhotoDatas.forEach(item => {
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
            {groupedByYear[year].map((monthPhotoData) => (
              <MonthItem key={monthPhotoData.createdAt} monthPhotoData={monthPhotoData}/>
            ))}
          </React.Fragment>
        ))}

    </div>
  );
};

const MonthItem = ({monthPhotoData}: MonthYearPhotoTabProps) => {
  const dateString = monthPhotoData.createdAt
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
      <img className="photo" src={monthPhotoData.imageUrl} alt={`${monthPhotoData.photoId}`}/>
    </Link>
  )
}

export default AllMonth;