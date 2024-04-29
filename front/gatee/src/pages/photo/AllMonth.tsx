import React from 'react';
import {Link} from "react-router-dom";

// import SamplePhoto from "@assets/images/schedule/calendarBanner1.jpg"

interface MonthPhotoItemProps {
  monthPhotoData: {
    dateTime:string,
    src: string
  }
}

const AllMonth = () => {

  // 월별 대표 사진 샘플 데이터
  const monthPhotoDatas = [
    {dateTime:"2024-01-31T12:00:00", src: "@assets/images/schedule/calendarBanner3.jpg"},
    {dateTime:"2024-02-28T12:00:00", src: "@assets/images/schedule/calendarBanner4.jpg"},
    {dateTime:"2024-03-31T12:00:00", src: "@assets/images/schedule/calendarBanner5.jpg"},
    {dateTime:"2024-04-30T12:00:00", src: "@assets/images/schedule/calendarBanner6.jpg"},
    {dateTime:"2024-05-31T12:00:00", src: "@assets/images/schedule/calendarBanner7.jpg"},
    {dateTime:"2023-01-31T12:00:00", src: "@assets/images/schedule/calendarBanner3.jpg"},
    {dateTime:"2023-02-28T12:00:00", src: "@assets/images/schedule/calendarBanner4.jpg"},
    {dateTime:"2023-03-31T12:00:00", src: "@assets/images/schedule/calendarBanner5.jpg"},
    {dateTime:"2023-04-30T12:00:00", src: "@assets/images/schedule/calendarBanner6.jpg"},
    {dateTime:"2023-05-31T12:00:00", src: "@assets/images/schedule/calendarBanner7.jpg"},
  ]

  // 년도별로 그룹화할 객체 생성
  const groupedByYear:{[year: string]: any[]} = {};

// 데이터 배열을 년도별로 그룹화
  monthPhotoDatas.forEach(item => {
    const year = item.dateTime.substring(0, 4); // 년도 추출
    if (!groupedByYear[year]) {
      groupedByYear[year] = []; // 년도별 그룹이 없으면 배열을 생성
    }
    groupedByYear[year].push(item); // 년도별 그룹에 아이템 추가
  });



  return (
    <div className="month-photo-container">
      {Object.keys(groupedByYear).sort((a, b) => parseInt(b) - parseInt(a))
        .map(year => {
          const yearData = groupedByYear[year]; // 해당 년도의 데이터 가져오기

          // 각각의 년도별 데이터를 처리한 결과를 반환
          return (
           <>
             <div className="detail-tab--title">{year}년</div>
             {yearData.map((monthPhotoData, index) => {
               return <MonthItem key={index} monthPhotoData={monthPhotoData}/>
             })
             }
           </>
          )


        })
      }
      {/* 주어진 데이터 정렬로 return */}


    </div>
  );
};

const MonthItem = ({monthPhotoData}: MonthPhotoItemProps) => {
  const dateString  =  monthPhotoData.dateTime
  const dateTime = new Date(dateString);
  // 현재의 년도 추출
  const year = dateTime.getFullYear();

// 현재의 월 추출 (0부터 시작하므로 +1을 해줘야 함)
  const month = dateTime.getMonth() + 1;
  return (
    <Link to={`${year}/${month}`} className="month-photo-item--container">
      {/* 월 표시 */}
      <div className="month">{month}월</div>
      {/* 배경 사진 */}
      <img className="photo" src={monthPhotoData.src}/>
    </Link>
  )
}

export default AllMonth;