import React from 'react';
import { useNavigate } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";

function TopBar () {
    const navigate = useNavigate();

    // 가려는 목적지를 문자열로 받으면, 이동시켜주는 함수
    const goTo = (destination: string) => {
        navigate(`/${destination}`);
    }

    // 바로 이전 페이지로 이동
    const goBack = () => {
        navigate(-1);
    }

    return <div className="topBar">
        <div className="topBar__leftDiv" onClick={goBack}>
            <IoChevronBack/>
        </div>
        <div className="topBar__rightDiv">
        <div onClick={() => goTo("notification")}>
            <GoBell />
        </div>
        <div onClick={() => goTo("profile")}>
            <IoPersonOutline />
        </div>
        </div>
    </div>
}

export default TopBar;