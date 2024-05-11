import React, {useEffect, useState} from 'react';
import Stamp from "@assets/images/icons/stamp_logo.png"
import {useNavigate} from "react-router-dom";
import {getExamResultApi} from "@api/exam";
// import Lottie from "lottie-react";
// import EmptyAnimation from "@assets/images/animation/empty_animation.json"
import {ReactComponent as EmptySvg} from "@assets/images/examImg/empty.svg";
import {ExamResult} from "@type/index";
import getGradeSvg from "@utils/getGradeSvg";

interface GradeData {
  score: number;
  createdAt: string;
}

const ExamGrade = () => {
  const [avgGrade, setAvgGrade] = useState<null | number>(null)
  const [gradeDataList, setGradeDataList] = useState<ExamResult[]>([
    {score: 80, createdAt: "2024.04.16"},
    {score: 60, createdAt: "2024.03.22"},
    {score: 40, createdAt: "2024.03.20"},
    {score: 10, createdAt: "2024.03.12"},
  ])

  useEffect(() => {
    getExamResultApi(
      res => {
        console.log(res)
        setGradeDataList(res.data)
        if (res.data?.length) {
          // score 속성의 배열 추출
          const scores = res.data.map(item => item.score)
          // 점수의 합 계산
          const scoreSum = scores.reduce((sum, score) => sum + score, 0);
          // 배열의 원소 개수 계산
          const count = scores.length;
          // 평균 계산
          const average = scoreSum / count;
          setAvgGrade(average)
        }
      },
      err => console.log(err)
    )
  }, []);

  return (
    <div className="exam-grade">

      {/* 상단 헤더 */}
      {avgGrade !== null ?
        <div className="exam__empty">
          <div className="large">성적표가 없어요</div>
          <EmptySvg className="exam__empty-icon"/>
        </div>
        :
        <>

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
        </>

      }

    </div>
  );
}

// 표
const Table = ({gradeData}: { gradeData: GradeData }) => {
  const navigate = useNavigate()
  // 등급
  const score = gradeData.score;
  const grade = getGradeSvg(score);
  return (
    <div className="exam-grade-data" onClick={() => navigate("/exam/scored/1")}>
      <div className="flex-date">{gradeData.createdAt}</div>
      <div className="flex-point">{gradeData.score}/100</div>
      <div className="flex-comment">{grade}</div>
    </div>
  )
}
export default ExamGrade;