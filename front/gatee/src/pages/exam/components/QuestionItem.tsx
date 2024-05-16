import React from 'react';
import {ReactComponent as CorrectImg} from "@assets/images/examImg/correct.svg"
import {ReactComponent as CheckImg} from "@assets/images/examImg/check.svg"
import {ReactComponent as WrongImg} from "@assets/images/examImg/wrong.svg"
import {TransformedQuestionData} from "@type/index";

interface QuestionScoredProps {
  question: TransformedQuestionData;
  questionNumber: number
}

const QuestionScored = (
  {question, questionNumber}: QuestionScoredProps) => {
  return (
    <div className="exam__item">
      {/* 채점 */}
      <Mark result={question?.choiceNumber===question?.correctNumber}/>

      {/* 문제 */}
      <div className="exam__item__question">
        {/*{question.correctNumber===question.choiceNumber? "true":"false"}*/}
        {questionNumber + 1}. {question?.question}
      </div>

      {/* 객관식 */}
      {question?.answerList.map((answer: any, i: number) => {
        return (
          <div key={i} className="exam__item__answer-list">
            {/* 객관식 번호 */}
            <div className={question?.choiceNumber === i + 1 ? "activate-index" : "deactivate-index"}>
              {i + 1}
            </div>
            {question?.correctNumber === i+1 ?
              <CheckImg className="exam__item__checkImg"/>
            :
              null
            }

            {/*  객관식 답변 내용 */}
            <div>{answer}</div>
          </div>
        )
      })}


    </div>
  );
};

const Mark = ({result}: { result:boolean }) => {

  return (
    <div className="exam__result__mark">
      {result ?
        <CorrectImg/>
        :
        <WrongImg/>
      }
    </div>
  )
}


export default QuestionScored;