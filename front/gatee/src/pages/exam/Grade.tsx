import React, {useState} from 'react';
import Stamp from "@assets/image/icons/stamp_logo.png"
import {useNavigate} from "react-router-dom";
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

interface GradeData {
  point: number;
  date: string;
  commentAmount: number; // 프로퍼티 이름 수정
}
const ExamGrade = () =>{
  const [avgGrade,setAvgGrade] = useState(1)
  const [gradeDataList,setGradeDataList] = useState([
    {point:80,date:"2024.04.16",commentAmount:3},
    {point:60,date:"2024.03.22",commentAmount:2},
    {point:40,date:"2024.03.20",commentAmount:2},
    {point:10,date:"2024.03.12",commentAmount:2},
  ])
  return (
    <div className="exam-grade">

      {/* 상단 헤더 */}
      <div className="exam__grade-header">
        <div className="small">나의 평균 점수는?</div>
        <div className="large">{avgGrade}등급</div>
      </div>
      <div className="exam__grade-body">

        {/*표 제목 - 인덱스*/}
        <div className="exam-grade-data">
          <div className="flex-date bgGray">날짜</div>
          <div className="flex-point bgGray">점수</div>
          <div className="flex-comment bgGray">등급</div>
          <div className="flex-comment bgGray">댓글</div>
        </div>

        {/*표 내용 */}
        {gradeDataList.map((gradeData, index) => {
          return <Table key={index} gradeData={gradeData}/>;
        })}
      </div>

      {/* 페이지 네이션 */}
      {/*<Stack spacing={2}>*/}
      {/*<Pagination count={10} />*/}
      {/*</Stack>*/}

      {/* 하단 도장 */}
      <div className="exam__grade-footer">
        <p>가족 퀴즈 모의고사 평가원장</p>
        <img src={Stamp} alt=""/>
      </div>
    </div>
  );
}

// 표
const Table = ({gradeData}: { gradeData: GradeData }) => {
  const navigate = useNavigate()
  // 등급
  let grade = 0;
  const point = gradeData.point;
  if (point >= 90 && point <= 100) {
    grade = 1;
  } else if (point >= 80) {
    grade = 2;
  } else if (point >= 70) {
    grade = 3;
  } else if (point >= 60) {
    grade = 4;
  } else if (point >= 50) {
    grade = 5;
  } else if (point >= 40) {
    grade = 6;
  } else if (point >= 30) {
    grade = 7;
  } else if (point >= 10 && point <= 20) {
    grade = 8;
  } else if (point === 0) {
    grade = 9;
  }

  return (
    <div className="exam-grade-data" onClick={()=>navigate("/exam/scored/1")}>
      <div className="flex-date">{gradeData.date}</div>
      <div className="flex-point">{gradeData.point}/100</div>
      <div className="flex-comment">{grade}</div>
      <div className="flex-comment">{gradeData.commentAmount}</div>
    </div>
  )
}
export default ExamGrade;