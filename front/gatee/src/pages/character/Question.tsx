import React from 'react';
import {Link} from "react-router-dom";

const CharacterQuestion = () => {
  // 질문
  const question: string = '못먹는 음식이 뭔가요?'
  //   건너뛰기 버튼
  const skip = ()=>{
    console.log("다음 질문");
  }
  // 제출 후 다음질문
  const submitHandler = () =>{
    console.log("제출");
    console.log("다음 질문");
  }

  return (
    <div className="character__question">

        {/*  그만두기 버튼 */}
      <Link className="skipButton" to="/character/start">
          그만할래요
      </Link>

        {/*  문제 명 */}
      <h1>{ question }</h1>

        {/*  입력란 */}
      <input className="character__question-input" type="text"
             placeholder="답변을 입력해 주세요"
             autoFocus/>

        {/*  다음 버튼 */}
      <button className="orangeButtonLarge" onClick={ submitHandler }>
          다음
      </button>

        {/*  건너뛰기 버튼 */}
      <p className="skipButton flex-center"
         onClick={ skip }>
          건너뛰기
      </p>

    </div>
  );
}

export default CharacterQuestion;