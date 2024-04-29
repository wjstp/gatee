import React, {useState} from 'react';
import { PiPencilSimpleBold } from "react-icons/pi";
const AnswerItem = ({question}:any) => {
    const index = "01";
    const q = "일번 문제";
    const [answer,setAnswer] = useState("정답");
    const [edit,setEdit] = useState(false);
    return (
        <div className='character__answer__item-card'>
            {/* 수정 버튼 */}
            <PiPencilSimpleBold
                className="editPencil"
                onClick={()=>setEdit(!edit)}
                size={20}/>

            {/* 문제 번호 + 문제 */}
            <div className="character__answer-item-container">

                <div className="character__answer__item-index">
                    #{index}
                </div>
                <div>
                    {q}
                </div>
            </div>
            {/* 정답 */}
            <div className="character__answer__item-content">
                {/* 수정 가능 */}
                {edit ?
                    <input type="text" value={answer}
                           className="edit__input"
                           onChange={(event:any) => {setAnswer(event.target.value)}}
                            autoFocus/>
                    :
                    <p>{answer}</p>
                }

            </div>

        </div>
    );
};

export default AnswerItem;