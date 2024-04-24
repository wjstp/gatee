import React, {useState} from 'react';
import Header from "./component/Header";
import QuestionItem from "./component/QuestionItem";
import {useNavigate} from "react-router-dom";

const ExamTaking = () => {
    const navigate = useNavigate();
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
        },
        {
            questionId: 2,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },
        {
            questionId: 3,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },
        {
            questionId: 4,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },
        {
            questionId: 5,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },
        {
            questionId: 6,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },
        {
            questionId: 7,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },
        {
            questionId: 8,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },{
            questionId: 9,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },{
            questionId: 10,
            question:"어쩌고 저쩌고",
            answer:"어쩌고 저쩌고",
            answerList:[
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'},
                {content:'안ㅇㄴ'}
            ]
        },

    ])
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answerList, setAnswerList] = useState([0,0,0,0,0,0,0,0,0,0])
    // 인덱스를 넘겨주고, 마지막 문제에서는 채점 화면으로 이동시켜준다
    const handleIndex = ()=>{
        if (questionIndex <9){
            setQuestionIndex(questionIndex + 1);
        }
        else {
            navigate("/exam/scored/1")
        }
    }
    return (
        <div>
            <Header/>
            <QuestionItem question={questions[questionIndex]} />
            <NextButton questionIndex={questionIndex} handleIndex={handleIndex}/>
        </div>
    );
};

const NextButton =({questionIndex,handleIndex}:any)=>{
    return(
        <div className="exam__taking__footer">
            <button onClick={handleIndex} className="nextButton">
                {questionIndex >= 9 ?
                    <> 완료</>:
                   <>다음 </>
                }

            </button>
        </div>
    )
}
export default ExamTaking;