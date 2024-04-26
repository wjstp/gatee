import React, {useRef} from 'react';
import {Link} from "react-router-dom";

function CharacterQuestion() {

  const question: string = '못먹는 음식이 뭔가요?'
  const skip = ()=>{
    console.log("다음 질문");
  }
  const submitHandler = () =>{
    console.log("제출");
    console.log("다음 질문");
  }

  return (
    <div className="character__question">
      <Link to="/character/start" className="skipButton">그만할래요</Link>
      <h1>{question}</h1>
      <input className="text-input" type="text"
             placeholder="답변을 입력해 주세요"
             autoFocus/>
      <button onClick={submitHandler} className="orangeButtonLarge">다음</button>
      <p onClick={skip} className="skipButton flex-center">건너뛰기</p>
    </div>
  );
}

export default CharacterQuestion;