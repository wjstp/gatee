import React from 'react';
import {useNavigate} from "react-router-dom";

function MainIndex() {
    const navigate = useNavigate();

    const signupButtonClick = ():void => {
        navigate('/signup');
    }

    return (
        <div>
            <div>
                <span>메인</span>
            </div>
            <button onClick={signupButtonClick}>
                회원가입
            </button>
        </div>
    );
}

export default MainIndex;