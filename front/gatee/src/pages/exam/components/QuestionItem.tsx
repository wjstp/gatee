import React, {useEffect, useState} from 'react';
import { ReactComponent as CorrectImg } from "@assets/images/examImg/correct.svg"
import { ReactComponent as WrongImg } from "@assets/images/examImg/wrong.svg"
interface QuestionItemProps {
  question: {
    questionId: number;
    question: string;
    answer: string;
    answerList: { content: string }[];
  };
  type: string,
  handleNextIndex: (list:number[]) => void,
  handleBeforeIndex: () => void,
  myAnswerList:number[]
}

// 재사용성을 위해 시험을 보고 있는 아이템인지, 아닌지 type을 받음 -> 클릭이벤트 설정 여부
const QuestionItem: React.FC<QuestionItemProps> = (
  {question, type, handleNextIndex, handleBeforeIndex
    ,myAnswerList}) => {
  const [selected, setSelected] = useState(0);

  // 선택된 답변을 수정해줌
  const [copyMyAnswerList,setCopyMyAnswerList] = useState(myAnswerList);
  const handleAnswer = ( value: number ) => {
    if ( type ==="taking" ) {
      setSelected( value )
    }
  }
  const submitNextIndex = ()=>{
    // 다음으로 넘겨주기
    const copy:number[] = [ ...copyMyAnswerList ]
    // 정답 리스트에 현재 인덱스에 답을 추가한다
    copy[ question.questionId-1 ] = selected
    // -> 바로 부모로 이벤트 보낼시, 저장되기 전에 이벤트가 발송된다
    // 때문에 해당 state를 관찰하다가, 변화가 생기면 발송한다
    setCopyMyAnswerList( copy )
    // 선택 초기화
    setSelected( 0 )
  }
  // 정답 리스트에 변화가 있으면, 부모에게 이벤트를 발송한다
  useEffect(() => {
    // 맨 첫 렌더링 제외(모든답이
    if (copyMyAnswerList.reduce(( accumulator, currentValue) => accumulator + currentValue, 0 ) !== 0 )
    handleNextIndex( copyMyAnswerList )
  }, [ copyMyAnswerList ]);
  return (
    <div className="exam__item">
      {/* 채점 */}
      { type === "scored" ?
          <Mark/>
          :
          null
      }

      {/* 문제 */}
      <div className="exam__item__question">
        { question.questionId }. { question.question }
      </div>

      {/* 객관식 */}
      {question.answerList.map(( answer: any, i: number ) => {
        return (
          <div key={ i } className="exam__item__answerList"
                    onClick={() => handleAnswer(i + 1)}>

          {/* 객관식 번호 */}
          <div className={ i + 1 === selected ? "activateIndex" : "deactivateIndex" }>
            {i + 1}
          </div>

          {/*  객관식 답변 내용 */}
          <div>{answer.content}</div>
        </div>
        )
      })}

      {/* 이전, 다음 버튼
          시험 보고 있는 중만 보임 */}
      {type === "taking" ?
        <div>
          <Button questionIndex={question.questionId}
                  submitNextIndex={submitNextIndex}
                      handleBeforeIndex={handleBeforeIndex}/>
        </div>

        : null}

    </div>
  );
};

// 버튼
const Button = ({questionIndex, handleBeforeIndex, submitNextIndex}: any) => {
  return (
    <div className="exam__taking__footer">

      {/* 이전 버튼 1번일때는 안보임 */}
      {questionIndex > 1 ?
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

const Mark = () => {
  const result = false
  return (
      <div className="exam__result__mark">
        { !result ?
            <CorrectImg/>
            :
            <WrongImg/>
        }
      </div>
  )
}



export default QuestionItem;