import React, {useState} from 'react';
import {Link, Outlet, useLocation} from "react-router-dom";
import { BsPlus } from "react-icons/bs";

const PhotoAlbumIndex = () => {
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(location.pathname); // 현재 경로를 기본값으로 설정

    // 활성화된 탭을 변경
    const handleTabClick = (path:string) => {
        setActiveTab(path);
    };

    return (
        <div>
            <div className="photoTab--container">

                <Link to="/photo/album"
                      className={activeTab === "/photo/album" ? "tabButton active" : "tabButton"}
                      onClick={() => handleTabClick("/photo/album")}>모든 사진</Link>

                <Link to="/photo/group/1"
                      className={activeTab === "/photo/group/1" ? "tabButton active" : "tabButton"}
                      onClick={() => handleTabClick("/photo/group/1")}>앨범 사진</Link>

                <BsPlus className="plusButton" size={50}/>
            </div>

            <Outlet/>
        </div>
    );
}

export default PhotoAlbumIndex;
