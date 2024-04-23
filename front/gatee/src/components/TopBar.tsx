import React from 'react';
import {useNavigate} from "react-router-dom";

function TopBar (){
    const navigate = useNavigate();
    // 가려는 목적지를 문자로 받으면, 이동시켜주는 함수
    const goto = function(destination:String){
        navigate(`/${destination}`);}
    // 뒤로는 연결 못함
    return <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
        <div>뒤로</div>
        <div style={{display: 'flex', flexDirection: 'row', gap:10}}>
        <button onClick={()=>goto("notification")}>알림</button>
        <button onClick={()=>goto("profile")}>프로필</button>
        </div>
    </div>
}

export default TopBar;