import React, {useState} from 'react';
import {PiPencilSimpleBold} from "react-icons/pi";
import {Answer} from "@type/index";
import {editAskAnswerApi} from "@api/dictionary";

const AnswerItem = ({question, index, isMine}: { question: Answer, index: number, isMine: boolean }) => {
  const [answer, setAnswer] = useState(question.answer);
  const [edit, setEdit] = useState(false);
  const submitEditAnswer = () => {
    editAskAnswerApi(
      {
        featureId: question.featureId,
        answer: answer
      }, res => {
        console.log(res)
      }, err => {
        console.log(err)
      }
    )
    setEdit(false);
  }
  return (
    <div className='character__answer__item-card'>
      {/* 수정 버튼 */}
      {isMine ?
        <PiPencilSimpleBold
          className="editPencil"
          onClick={() => setEdit(!edit)}
          size={20}/>

        : null}

      {/* 문제 번호 + 문제 */}
      <div className="character__answer-item-container">

        <div className="character__answer__item-index">
          #{index + 1}
        </div>
        <div>
          {question.question}
        </div>
      </div>
      {/* 정답 */}
      <div className="character__answer__item-content">
        {/* 수정 가능 */}
        {edit ?
          <input type="text" value={answer}
                 className="edit__input"
                 onChange={(event: any) => {
                   setAnswer(event.target.value)
                 }}
                 autoFocus
                 onBlur={() => submitEditAnswer()}
          />
          :
          <p>{answer}</p>
        }

      </div>

    </div>
  );
};

export default AnswerItem;