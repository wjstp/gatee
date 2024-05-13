import React, {useEffect} from 'react';
import Header from "@pages/character/components/Header";
import AnswerItem from "@pages/character/components/AnswerItem";
import {Link} from "react-router-dom";
import {getAnsweredAskApi} from "@api/dictionary";
import {useDictStore} from "@store/useDictStore";


const CharacterStart = () => {
  const {answerList, setAnswerList} = useDictStore()
  useEffect(() => {
    getAnsweredAskApi(res => {
      console.log(res.data)
      setAnswerList(res?.data)

    }, err => {
      console.log(err)
    })
  }, []);
  return (
    <div className="character__answerList">
      {/* 헤더 */}
      <Header/>

      {/* 사전 작성하기 버튼 */}
      <Link to="/character/question"
            className="orangeButtonLarge">
        사전 작성하기
      </Link>

      {/* 작성한 답안 */}
      {answerList.map((item, index) => {
        return (
          <AnswerItem key={index} question={item} index={index}/>
        )
      })}
    </div>
  );
}

export default CharacterStart;