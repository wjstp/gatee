import React from 'react';
import Header from "./components/Header";
import QuestionItem from "./components/QuestionItem";
import getScoreImage from "@utils/getScoreImage";

const ExamScored = () => {
  const questions = [
    {
      questionId: 1,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 2,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 3,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 4,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 5,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 6,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 7,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },
    {
      questionId: 8,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    }, {
      questionId: 9,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    }, {
      questionId: 10,
      question: "어쩌고 저쩌고",
      answer: "어쩌고 저쩌고",
      answerList: [
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'},
        {content: '안ㅇㄴ'}
      ]
    },

  ]
  //
  // const questionList = [
  //   {
  //     "question": "문제",
  //     "wrongAnswers": ["틀린 문장","틀린 문장","틀린 문장"],
  //     "correctAnswer": "정답 문장"
  //   },
  //   {
  //     "question": "문제",
  //     "wrongAnswers": ["틀린 문장","틀린 문장","틀린 문장"],
  //     "correctAnswer": "정답 문장"
  //   },
  // ]



  return (
    <div className="exam__scored">
      <Header/>

      {/* 점수 */}
      <Grade/>

      {/* 문제 컴포넌트
          재사용성을 위해 이용되는 위치를 prop으로 내려줌*/}
      {questions.map((item, index) => {
        return (<QuestionItem key={ index } question={ questions[index] } type={ "scored" }
                              myAnswerList={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
                              handleNextIndex={() => console.log()}
                              handleBeforeIndex={() => console.log()}
        />)})}

      {/*<QuestionItemTaking*/}
      {/*    questionItem={questionList[nowNumber]}*/}
      {/*    type={"taking"} handleNextIndex={() => console.log()}*/}
      {/*    handleBeforeIndex={() => console.log()}*/}
      {/*    />*/}

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

const Grade = () => {
  const scoreState: number = 90
  return (
    <div className="exam__scored-mark">
      {/* 점수 */}
      {getScoreImage(scoreState)}
    </div>)

}
export default ExamScored;