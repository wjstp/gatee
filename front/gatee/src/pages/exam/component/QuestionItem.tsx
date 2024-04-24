import React, {useState} from 'react';
import question from "../../character/Question";
interface QuestionItemProps {
    question: {
        questionId: number;
        question: string;
        answer: string;
        answerList: { content: string }[];
    };
}
const QuestionItem: React.FC<QuestionItemProps> = ({ question }) => {
    const [selected,setSelected] = useState(0);
    // 선택된 답변을
    const handleAnswer = (value:number)=>{
        console.log(value);
        setSelected(value)
    }
    return (
        <div className="exam__item">
            <div className="exam__item__question">
                {question.questionId}. {question.question}
            </div>
            {question.answerList.map((answer:any, i:number) =>{
                return <div key={i} className="exam__item__answerList"
                            onClick={()=>handleAnswer(i+1)}>
                    <div className={i + 1 === selected ? "activateIndex" : "deactivateIndex"}>{i + 1}</div>
                    <div>{answer.content}</div>
                </div>
            })}
        </div>
    );
};

export default QuestionItem;