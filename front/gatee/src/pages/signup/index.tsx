import React from 'react';
import {useNavigate} from "react-router-dom";

function SignupIndex() {
    const navigate = useNavigate();
    // 누른 버튼에 따라 다른 상태 전달(렌더링 페이지 변경)
    const createFamilyButtonClick = (): void => {
        navigate('/signup/family', { state: { action: 'create' } });
    }
    const joinFamilyButtonClick = (): void => {
        navigate('/signup/family', { state: { action: 'join' } });
    }

    return (
        <div>
            <div>
                <span>가족과</span>
                <span>한발짝</span>
                <span>다가가 볼까요?</span>
            </div>
            <div>
                <button
                    onClick={createFamilyButtonClick}
                >
                    내 가족 생성하기
                </button>
            </div>
            <div>
                <button
                    onClick={joinFamilyButtonClick}
                >
                    초대 코드 입력
                </button>
            </div>
        </div>
    );
}

export default SignupIndex;