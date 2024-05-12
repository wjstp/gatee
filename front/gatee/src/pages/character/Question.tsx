import React, {useState} from 'react';
import { useNavigate} from "react-router-dom";
import {useDictStore} from "@store/useDictStore";
import {sumbitAskAnswerApi} from "@api/dictionary";

const CharacterQuestion = () => {
  const navigate = useNavigate();
  const {askList, askIndex, setAskIndex} = useDictStore()
  const [inputValue, setInputValue] = useState('');

  // 건너뛰기 버튼
  const skip = () => {
    console.log("다음 질문");
    if (askIndex < askList.length - 1)
      setAskIndex(askIndex + 1)
  }

  // 제출 후 다음질문
  const submitHandler = () => {
    if (askIndex < askList.length - 1) {
      sumbitAskAnswerApiFunc()
    } else {
      setAskIndex(0)
    }
  }
  // 그만할래요
  const quitDictionary = () => {
    setAskIndex(0)
    navigate("/character/start")
  }

  // 답변 제출
  const sumbitAskAnswerApiFunc = () => {
    sumbitAskAnswerApi(
      {
        featureId: askList[askIndex].featureId,
        answer: inputValue
      }, res => {
        console.log(res)
        console.log("제출");
        console.log("다음 질문");
        setAskIndex(askIndex + 1)
        setInputValue("")
      }, err => {
        console.log(err)
      }
    )
  }

  return (
    <div className="character__question">

      {/*  그만두기 버튼 */}
      <div className="skipButton"
           onClick={()=>quitDictionary()}
           >
        그만할래요
      </div>

      {/*  문제 명 */}
      <h1>{askList[askIndex].question}</h1>

      {/*  입력란 */}
      <input className="character__question-input"
             type="text"
             value={inputValue}
             onChange={(e) => setInputValue(e.target.value)}
             placeholder="답변을 입력해 주세요"
             autoFocus/>

      {/*  다음 버튼 */}
      <button className="orangeButtonLarge" onClick={submitHandler}>
        {askIndex < askList.length - 1 ? "다음" : "완료"}
      </button>

      {/*  건너뛰기 버튼 */}
      <p className="skipButton flex-center"
         onClick={skip}>
        건너뛰기
      </p>

    </div>
  );
}

export default CharacterQuestion;