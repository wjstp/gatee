import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import { FiEdit } from "react-icons/fi";
const PhotoIndex = () => {
  const location = useLocation();

  const navigate = useNavigate()
  // 상단 탭 상태 관리 -> 모든 사진 / 앨범사진

  const [activeTab, setActiveTab] = useState("all"); // 현재 경로를 기본값으로 설정
  // 모든 사진의 하단 탭 상태 관리 -> 일 / 월 / 연
  const [allPhotoTab, setAllPhotoTab] = useState("day");

  // 활성화된 상단 탭을 변경
  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  // 뒤로가기 고려한 상태 변경
  useEffect(() => {

    if (location.pathname.includes("/photo/month")) {
      setAllPhotoTab("month")
      setActiveTab("all")
    } else if (location.pathname.includes("/photo/year")) {
      setAllPhotoTab("year")
      setActiveTab("all")
    } else if (location.pathname.includes("/photo/day")) {
      setAllPhotoTab("day")
      setActiveTab("all")
    } else if (location.pathname.includes("/photo/album")) {
      setActiveTab("album")
    } else if (location.pathname==="/photo") {
      navigate("day")
    } else {
      setActiveTab("detail")
    }
  }, [location.pathname]);

  return (
    <div className="photo">
      <div className="photo-tab-container">
        {/* 모든 사진 탭 */}
        <Link to="/photo/day"
              className={activeTab === "all" ? "photo-tab-container__button active" : "photo-tab-container__button"}
              onClick={() => handleTabClick("all")}>모든 사진</Link>

        {/* 앨범 사진 탭 */}
        <Link to="/photo/album"
              className={activeTab === "album" ? "photo-tab-container__button active" : "photo-tab-container__button"}
              onClick={() => handleTabClick("album")}>앨범 사진</Link>

        {/* 사진 추가 버튼 */}
        <FiEdit className="photo-tab-container__plus-button" size={20}/>
      </div>

      {activeTab === "all"  ?
        (<div className="day-month-year-controller">
          <Link to="/photo/day"
                className={allPhotoTab === "day" ? "day-btn active-btn" : "day-btn"}
                onClick={() => setAllPhotoTab("day")}
          >일
          </Link>
          <Link to="/photo/month"
                className={allPhotoTab === "month" ? "month-btn active-btn" : "month-btn"}
                onClick={() => setAllPhotoTab("month")}
          >월
          </Link>
          <Link to="/photo/year"
                className={allPhotoTab === "year" ? "year-btn active-btn" : "year-btn"}
                onClick={() => setAllPhotoTab("year")}
          >연
          </Link>
        </div>)
        :
        null}


      <Outlet/>
      {/* 활설화된 모든 사진의 일월연 탭  */}


    </div>
  );
}

const EditModal = () => {
  return (
    <div className="edit-modal">
      <div>
        사진 삭제
      </div>
      <div>
        앨범 생성
      </div>
    </div>
  )
}
export default PhotoIndex;
