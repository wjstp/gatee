import React, {useState} from 'react';
import Header from "./component/Header";
import QuestionItem from "./component/QuestionItem";

const ExamTaking = () => {
    const [questions, setQuestions] = useState([
        {
            questionId: 1,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        }
    ])
    return (
        <div>
            ExamTaking
            <Header/>
            {questions.map((question, i) => (<QuestionItem key={i} />))}
        </div>
    );
};

export default ExamTaking;