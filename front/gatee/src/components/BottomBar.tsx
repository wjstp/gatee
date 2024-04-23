import React from 'react';
import { useNavigate } from "react-router-dom";
import { ReactComponent as ExamIcon } from "../assets/icons/exam.svg"
import { ReactComponent as CalendarIcon } from "../assets/icons/calendar.svg"
import { ReactComponent as ChatIcon } from "../assets/icons/chat.svg"
import { ReactComponent as HomeIcon } from "../assets/icons/home.svg"
import { ReactComponent as PhotoIcon } from "../assets/icons/photo.svg"

function BottomBar(){
    // 가려는 목적지를 문자로 받으면, 이동시켜주는 함수
    const navigate = useNavigate();
    const goTo = (destination: string) => {
        navigate(`/${destination}`);
    }

    return (
        <div className="bottomBar">
            <div className="bottomBar__item" onClick={() => goTo("exam")}>
                <ExamIcon/>
            </div>
            <div className="bottomBar__item" onClick={() => goTo("chat")}>
                <ChatIcon/>
            </div>
            <div className="bottomBar__item" onClick={() => goTo("main")}>
                <HomeIcon/>
            </div>
            <div className="bottomBar__item" onClick={() => goTo("schedule")}>
                <CalendarIcon/>
            </div>
            <div className="bottomBar__item" onClick={() => goTo("album")}>
                <PhotoIcon/>
            </div>
        </div>
    )
}

export default BottomBar;