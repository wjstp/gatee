import React, {useEffect, useState} from 'react';
import Header from "./components/Header";
import QuestionItem from "./components/QuestionItem";
import getScoreImage from "@utils/getScoreImage";
import {transformedExamList} from "@constants/index";
import {useParams} from "react-router-dom";
import {getDetailExamResultApi} from "@api/exam";
import {TransformedQuestionData} from "@type/index";

const ExamScored = () => {
  const params = useParams()
  const [examDetailResult,setExamDetailResult] = useState<TransformedQuestionData[]>(transformedExamList)
  const [score,setScore] = useState(0)
  useEffect(() => {
    if (params.id){
      getDetailExamResultApi(params.id,
        res=>{
        console.log(res)
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

      {/* 점수 */}
      <Grade score={score}/>

      {examDetailResult.map((item, index) => {
        return (<QuestionItem key={ index } questionNumber={index} question={ item }
        />)})}


      {/* 하단의 줄 두개 */}
      <div className="exam__scored-footer">
      </div>


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