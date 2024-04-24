import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {ReactComponent as HomeIcon} from "../assets/icons/home.svg"
import {PiGraduationCap} from "react-icons/pi";
import {PiCalendar} from "react-icons/pi";
import {PiChatCenteredDots} from "react-icons/pi";
import {PiImage} from "react-icons/pi";

const BottomBar = () => {
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState('');
    // 탭을 보여줄 화면인지 아닌지 boolean으로 상태 표시
    const [tabShow, setTabShow] = useState(true);
    const noTabUrl:string[] = [
        "/",
        "/kakao",
        "/signup",
        "/signup/member",
        "/signup/family"
    ]

    useEffect(() => {
        setCurrentPage(location.pathname)
        console.log(location.pathname)
        if (noTabUrl.includes(location.pathname)) {
            setTabShow(false)
        } else {
            setTabShow(true)
        }
    }, [location])
    return (
        <div>
            {tabShow ?
                <div className="bottomBar">
                    <NavLink to="/exam" className={({isActive}) =>
                        isActive ? 'bottomBar__item--active' : 'bottomBar__item'
                    }>
                        <PiGraduationCap size={24}/>
                        <span>모의고사</span>
                    </NavLink>
                    <NavLink to="/chat" className={({isActive}) =>
                        isActive ? 'bottomBar__item--active' : 'bottomBar__item'
                    }>
                        <PiChatCenteredDots size={24}/>
                        <span>채팅</span>
                    </NavLink>
                    <NavLink to="/main" className={({isActive}) =>
                        isActive ? 'bottomBar__item--active bottomBar__itemHome--active' : 'bottomBar__item'
                    }>
                        <HomeIcon/>
                        <span>홈</span>
                    </NavLink>
                    <NavLink to="/schedule" className={({isActive}) =>
                        isActive ? 'bottomBar__item--active' : 'bottomBar__item'
                    }>
                        <PiCalendar size={24}/>
                        <span>일정</span>
                    </NavLink>
                    <NavLink to="/photo" className={({isActive}) =>
                        isActive ? 'bottomBar__item--active' : 'bottomBar__item'
                    }>
                        <PiImage size={24}/>
                        <span>앨범</span>
                    </NavLink>
                </div>

                : null
            }
        </div>
    )
}

export default BottomBar;