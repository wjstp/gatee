import React from 'react';
import Header from "@pages/character/components/Header";
import AnswerItem from "@pages/character/components/AnswerItem";
import {Link} from "react-router-dom";

const CharacterStart = () => {
    const answers = [
        {
            question:"일번문제?",
            answer:"어쩌구",
        },
        {
            question:"이번문제?",
            answer:"어쩌구",
        },
        {
            question:"삼번문제?",
            answer:"어쩌구",
        },
        {
            question:"사번문제?",
            answer:"어쩌구",
        },
        {
            question:"오번문제?",
            answer:"어쩌구",
        },
        {
            question:"육번문제?",
            answer:"어쩌구",
        },

    ]
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
            { answers.map((item, index) => {
                return (
                    <AnswerItem key={index} question={item}/>
                )
            })}
        </div>
    );
}

export default CharacterStart;