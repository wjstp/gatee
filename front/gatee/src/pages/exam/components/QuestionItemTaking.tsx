import React, {useEffect, useState} from 'react';
import {TransformedQuestionData} from "@type/index";

interface QuestionItemTakingProps {
  handleNextIndex: (questionNumber:number,value:number) => void,
  handleBeforeIndex: (questionNumber:number,value:number) => void,
  questionNumber: number,
  questionItem: TransformedQuestionData
  myAnswerList:number[]
}

// 재사용성을 위해 시험을 보고 있는 아이템인지, 아닌지 type을 받음 -> 클릭이벤트 설정 여부
const QuestionItemTaking = (
  {
    questionItem,
    questionNumber,
    handleBeforeIndex
    , handleNextIndex,
    myAnswerList
  }: QuestionItemTakingProps) => {

  const [selected, setSelected] = useState(myAnswerList[questionNumber]);

  const handleAnswer = (value: number) => {
    setSelected(value)
  }

  const submitNextIndex = () => {
    handleNextIndex(questionNumber,selected)
  }

  const submitBeforeIndex = () => {
    handleBeforeIndex(questionNumber,selected)
  }
  // 문제 번호가 변경될때마다 선택된값을 변경해준다
  useEffect(() => {
    setSelected(myAnswerList[questionNumber])
  }, [questionNumber]);

  return (
    <div className="exam__item">
      {/* 문제 */}
      <div className="exam__item__question">
        {questionNumber+1}. {questionItem?.nickname}님의 {questionItem?.question}은?
      </div>

      {/* 객관식 */}
      {questionItem?.answerList.map((answer: any, i: number) => {
        return (
          <div key={i} className="exam__item__answerList"
               onClick={() => handleAnswer(i + 1)}>

            {/* 객관식 번호 */}
            <div className={i + 1 === selected ? "activateIndex" : "deactivateIndex"}>
              {i + 1}
            </div>

            {/*  객관식 답변 내용 */}
            <div>{answer}</div>
          </div>
        )
      })}

      {/* 이전, 다음 버튼
          시험 보고 있는 중만 보임 */}
      <div>
        <Button questionIndex={questionNumber}
                submitNextIndex={submitNextIndex}
                handleBeforeIndex={submitBeforeIndex}/>
      </div>


    </div>
  );
};

// 버튼
const Button = ({questionIndex, handleBeforeIndex, submitNextIndex}: any) => {
  return (
    <div className="exam__taking__footer">

      {/* 이전 버튼 1번일때는 안보임 */}
      {questionIndex > 0 ?
        <button onClick={handleBeforeIndex} className="nextButton">
          이전
        </button>
        : <div></div>
      }

      {/* 다음 버튼 - 마지막일때는 완료로 보임 */}
      <button onClick={submitNextIndex} className="nextButton">
        {questionIndex >= 9 ?
          <> 완료</> :
          <> 다음 </>
        }
      </button>
    </div>
  )
}


export default QuestionItemTaking;