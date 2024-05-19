import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import QuestionScored from "./components/QuestionItem";
import getScoreImage from "@utils/getScoreImage";
// import {transformedExamList} from "@constants/index";
import {Link, useParams} from "react-router-dom";
import {getDetailExamResultApi} from "@api/exam";
import {TransformedQuestionData} from "@type/index";
// import {useMemberStore} from "@store/useMemberStore";

const ExamScored = () => {
  const params = useParams()
  const [examDetailResult,setExamDetailResult] = useState<TransformedQuestionData[]>([])
  const [score,setScore] = useState(0)

  useEffect(() => {
    if (params.examId){
      getDetailExamResultApi(params.examId,
        res=>{
        console.log("getDetailExamResultApi",res)

          setExamDetailResult(res.data.examData)
          setScore(res.data.score)
        },
        err=>{
        console.log(err)
        })
    }
  }, [params]);

  return (

    <div className="exam__scored">
      <Header/>

      {
        examDetailResult.length === 0 ?
          null :
          <>
            {/* 점수 */}
            <Grade score={score}/>

            {examDetailResult.map((item, index) => {
              return (<QuestionScored key={ index } questionNumber={index} question={ item }
              />)})}


            {/* 하단의 줄 두개 */}
            <div className="exam__scored-footer">
            </div>

            <Link to="/exam/grade" className="exam__scored--goto-grade">
              가족 성적표 보러가기
            </Link>
          </>
      }


    </div>
  );
}

// const ExamComment: React.FC<{ comment: { memberName:string, comment:string} }> = ({comment})=>{
//   return(
//     <div className="exam__scored-comment">
//     <img src="" alt="프사"/>
//     <div className="comment">
//       <p className="text-gray-100">{comment.memberName}</p>
//       <p>{comment.comment}</p>
//     </div>
//   </div>)
//
// }

const Grade = ({score}: { score:number }) => {
  // const score: number = 90
  return (
    <div className="exam__scored-mark">
      {/* 점수 */}
      {getScoreImage(score)}
    </div>)

}
export default ExamScored;