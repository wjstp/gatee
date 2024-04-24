import React, {useEffect, useState} from 'react';
import {useNavigate, NavLink, useLocation} from "react-router-dom";
import {PiCaretLeft} from "react-icons/pi";
import {PiBell} from "react-icons/pi";
import {PiUserCircle} from "react-icons/pi";
import {PiSquaresFour} from "react-icons/pi";
import {PiGearSix} from "react-icons/pi";

const TopBar = () => {
    const navigate = useNavigate();
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

    // 바로 이전 페이지로 이동
    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            {tabShow ?
                <div className="topBar">
                    <div className="leftDiv" onClick={goBack}>
                        <PiCaretLeft size={24}/>
                    </div>
                    <div className="rightDiv">
                        {currentPage === '/notification' && (
                            <PiGearSix size={24}/>
                        )}
                        {currentPage === '/chat' && (
                            <PiSquaresFour size={24}/>
                        )}
                        <NavLink to="/notification" className={({isActive}) =>
                            isActive ? 'rightDiv--active' : ''
                        }>
                            <PiBell size={24}/>
                        </NavLink>
                        <NavLink to="/profile" className={({isActive}) =>
                            isActive ? 'rightDiv--active' : ''
                        }>
                            <PiUserCircle size={24}/>
                        </NavLink>
                    </div>
                </div>
                :
                null
            }

        </div>
    )
}

export default TopBar;