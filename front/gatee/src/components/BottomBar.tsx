import React from 'react';
import {useNavigate} from "react-router-dom";
function BottomBar(){
    // 가려는 목적지를 문자로 받으면, 이동시켜주는 함수
    const navigate = useNavigate();
    const goto = function(destination:String){
        navigate(`/${destination}`);
    }
    return (
    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>

        <button onClick={()=>goto("exam")}>모의고사</button>
        <button onClick={()=>goto("chat")}>채팅</button>
        <button onClick={()=>goto("main")}>홈</button>
        <button onClick={()=>goto("schedule")}>일정</button>
        <button onClick={()=>goto("album")}>앨범</button>
    </div>
)
}

export default BottomBar;