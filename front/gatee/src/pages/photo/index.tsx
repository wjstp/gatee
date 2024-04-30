import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {LuFolderInput} from "react-icons/lu";
import {FiFolderPlus} from "react-icons/fi";
import TextField from '@mui/material/TextField';
import {useModalStore} from "@store/useModalStore";
import useModal from "@hooks/useModal";

interface handleSetEditMode {
  handleSetEditMode: (mode: string) => void
}


const PhotoIndex = () => {
  const location = useLocation();
  const navigate = useNavigate()
  // 상단 탭 상태 관리 -> 모든 사진 / 앨범사진
  const [activeTab, setActiveTab] = useState("all"); // 현재 경로를 기본값으로 설정
  // 모든 사진의 하단 탭 상태 관리 -> 일 / 월 / 연
  const [allPhotoTab, setAllPhotoTab] = useState("day");
  // 모달 상태
  const {setShowModal} = useModalStore()
  // 편집모드 고르기 모달 상태
  const {isOpen: showEditModeModal, openModal: openEditModal, closeModal: closeEditModeModal} = useModal();
  // 앨범 이름 고르기 모달 상태
  const {
    isOpen: showAlbumNameInputModal,
    openModal: openAlbumNameInputModal,
    closeModal: closeAlbumNameInputModal
  } = useModal();
  // 편집할 photoId들이 담긴 set
  const editPhotoIdList: Set<number> = new Set();
  // 수정 모드 선택
  const [editMode, setEditMode] = useState("normal")

  // 활성화된 상단 탭에 대한 상태 변경 => 모든 사진, 앨범 사진
  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  // 선택 모드 제출 이벤트
  const handleEndEditMode = () => {
    console.log(editPhotoIdList)
    if (editMode === "delete") {
      console.log('선택 사진 삭제')
    } else if (editMode === "makeAlbum") {
      console.log('선택 사진 앨범 넣기')
    }
    // 편집모드 변경
    setEditMode("normal")
    // 담아둔 id 리스트 비우기
    editPhotoIdList.clear()
  }

  // 편집 모달 보이기 이벤트
  const handleOpenEditModal = () => {
    openEditModal();
    setShowModal(true)
  }

  // 앨범 이름 입력 모달 닫기 이벤트
  const handleCloseAlbumNameInputModal = () => {
    closeAlbumNameInputModal()
    setShowModal(false)
  }

  // 편집 모드를 결정하는 함수 => EditModal에서 받은 이벤트 실행 함수
  const handleSetEditMode = (mode: string) => {
    // 편집 모드를 결정한다
    setEditMode(mode)

    if (mode === "normal") {
      // 일반 모드 선택 => 모달을 모두 끈다
      setShowModal(false)
      closeEditModeModal()

    } else if (mode === "delete") {
      // 사진 삭제 모드 선택 => 모달을 끄고 편집 모드로 들어간다
      setShowModal(false)
      closeEditModeModal()
    } else {
      // 앨범 생성 모드 선택 => 편집모달을 끄고, 앨범 이름 입력 모달을 킨다
      closeEditModeModal()
      openAlbumNameInputModal()
    }
  }

  // 편집할 사진 추가 및 삭제  => PhotoList 컴포넌트에서 받은 이벤트 실행 함수
  const handleChecked = (photoId: number, type: string) => {
    if (type === "delete") {
      // 체크가 풀린 사진을 삭제한다
      editPhotoIdList.delete(photoId)
    } else {
      // 지금 체크된 사진을 추가한다
      editPhotoIdList.add(photoId)
    }
  }

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
    } else if (location.pathname === "/photo") {
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


        {/* 편집 버튼 */}
        {
          editMode === "delete" ?
            <RiDeleteBin6Line className="photo-tab-container__plus-button" size={25}
                              onClick={handleEndEditMode}/>
            : editMode === "makeAlbum" ?
              <LuFolderInput className="photo-tab-container__plus-button" size={20}
                             onClick={handleEndEditMode}/>
              :
              <FiEdit className="photo-tab-container__plus-button" size={20}
                      onClick={handleOpenEditModal}/>
        }

      </div>

      {activeTab === "all" ?
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

      <Outlet context={{editMode: editMode, handleChecked: handleChecked}}/>
      {/* 활설화된 모든 사진의 일월연 탭  */}

      {/* 모달 */}
      {
        showEditModeModal ?
          <EditModal handleSetEditMode={handleSetEditMode}/>
          :
          null
      }

      {
        showAlbumNameInputModal ?
          <AlbumNameInputModal handleCloseAlbumNameInputModal={handleCloseAlbumNameInputModal}/>
          :
          null
      }
    </div>
  );
}


// 수정 모드 고르는 모달
const EditModal = ({handleSetEditMode}: handleSetEditMode) => {

  // 버튼 눌렀을때 편집 모드를 설정
  const handleBtn = (mode: string) => {
    console.log("버튼 눌렀을때 모달에서의 상태", mode)
    handleSetEditMode(mode)
  }

  return (
    <div className="edit-modal-bg">

      {/* 모달 내용 */}
      <div className="edit-modal-content">

        {/* 사진 삭제 */}
        <div className="icon-title-center"
             onClick={() => handleBtn("delete")}>
          <RiDeleteBin6Line size={30} color="gray"/>
          <div>
            사진 삭제
          </div>
        </div>

        {/* 앨범 생성 */}
        <div className="icon-title-center"
             onClick={() => handleBtn("makeAlbum")}>
          <FiFolderPlus size={30} color="gray"/>
          <div>앨범 생성
          </div>
        </div>

      </div>

    </div>
  )
}

const AlbumNameInputModal = ({ handleCloseAlbumNameInputModal }: { handleCloseAlbumNameInputModal: () => void }) => {
  // 입력상태
  const [inputValue, setInputValue] = useState("");
  const muiFocusCustom = {
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFBE5C",
          borderWidth: "2px",
        },
      }
    }
  };


  // 입력값이 변경될 때 호출되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // 앨범 생성 버튼을 클릭할 때 호출되는 함수
  const handleCreateAlbum = () => {
    // 입력값이 비어있지 않을 때만 모달 닫기 함수 호출
    if (inputValue.trim() !== "") {
      handleCloseAlbumNameInputModal();
    }
  };

  return (
    <div className="input-modal-bg">
      {/* 모달 내용 */}
      <div className="input-modal-content">
        <div className="modal-title">앨범 이름 작성</div>
        {/* 입력값이 변경될 때마다 handleChange 함수 호출 */}
        <TextField value={inputValue} onChange={handleChange} type="text" placeholder="예) 길동이 아기 시절" sx={muiFocusCustom} />
        {/* 입력값이 비어있지 않으면 버튼 활성화 */}
        <button onClick={handleCreateAlbum} disabled={inputValue.trim() === ""} className="submit-btn">앨범 생성</button>
      </div>
    </div>
  );
};
export default PhotoIndex;
