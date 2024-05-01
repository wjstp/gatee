import React, {useEffect, useRef, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {LuFolderInput} from "react-icons/lu";
import {FaPlus} from "react-icons/fa6";
import {useModalStore} from "@store/useModalStore";
import useModal from "@hooks/useModal";
import {AlbumNameInputModal} from "@pages/photo/components/CreateAlbumModal";
import {EditModal} from "@pages/photo/components/EditModeModal";
import {SelectAlbumModal} from "@pages/photo/components/SelectAlbum";



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
  // 생성할 앨범 이름 입력 모달 상태
  const {
    isOpen: showAlbumNameInputModal,
    openModal: openAlbumNameInputModal,
    closeModal: closeAlbumNameInputModal
  } = useModal();

  // 이동할 앨범 이름 고르기 모달 상태
  const {
    isOpen: showSelectMoveAlbumModal,
    openModal: openSelectMoveAlbumModal,
    closeModal: closeSelectMoveAlbumModal
  } = useModal();

  // 편집할 photoId들이 담긴 set
  const editPhotoIdList: Set<number> = new Set();
  // 수정 모드 선택
  const [editMode, setEditMode] = useState("normal")
  // 목적지가 될 앨범 Id
  const [albumId, setAlbumId] = useState(0);
  const [albumName, setAlbumName] = useState("");
  // 추가될 사진
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | ArrayBuffer | null>(null);

  // 활성화된 상단 탭에 대한 상태 변경 => 모든 사진, 앨범 사진
  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  // 선택 모드 제출 이벤트
  const handleEndEditMode = () => {
    console.log(editPhotoIdList)

    if (editMode === "delete") {
      console.log('선택 사진 삭제')
      // 담아둔 id 리스트 비우기
      editPhotoIdList.clear()

    } else if (editMode === "makeAlbum") {
      console.log('선택 사진 앨범 생성')
      navigate("/photo/album/1")
      editPhotoIdList.clear()

      // 편집 모드가 앨범으로 이동일때
    } else if (editMode === "moveAlbum") {
      console.log('선택 사진 앨범으로 이동')
      console.log(editPhotoIdList, albumName,'으로 이동',)
      editPhotoIdList.clear()
      navigate(`/photo/album/${albumId}`)
    }

    // 편집모드 변경
    setEditMode("normal")

  }

  // 편집 모달 보이기 이벤트
  const handleOpenEditModal = () => {
    openEditModal();
    setShowModal(true)
  }

  // 앨범 이름 입력 모달 닫기 이벤트
  const handleCloseAlbumNameInputModal = (inputValue: string) => {
    // 백드롭 클릭 이벤트로 닫힌다면, 모달도 닫고 편집모드도 normal로 돌아가기
    if (inputValue === "") {
      // console.log('백드롭 이벤트')
      closeAlbumNameInputModal()
      setShowModal(false)
      setEditMode("normal")

    } else {
      setAlbumName(inputValue)
      console.log(inputValue, "앨범 생성 axios")
      closeAlbumNameInputModal()
      setShowModal(false)
    }

  }

  // 편집 모드를 결정하는 함수 => EditModal에서 받은 이벤트 실행 함수
  const handleSetEditMode = (mode: string) => {
    // 편집 모드를 결정한다
    setEditMode(mode)

    if (mode === "normal") {
      // 일반 모드 선택 => 모달을 모두 끈다
      console.log('백드롭 이벤트')
      setShowModal(false)
      closeEditModeModal()

    } else if (mode === "delete") {
      // 사진 삭제 모드 선택 => 모달을 끄고 편집 모드로 들어간다
      setShowModal(false)
      closeEditModeModal()

    } else if (mode === "makeAlbum") {
      // 앨범 생성 모드 선택 => 편집모달을 끄고, 앨범 이름 입력 모달을 킨다
      closeEditModeModal()
      openAlbumNameInputModal()

    } else {
      // 앨범으로 이동 모드 선택 => 편집 모달을 끄고, 앨범 선택 모달을 킨다
      closeEditModeModal()
      openSelectMoveAlbumModal()
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

  // 앨범 고르기
  const handleSelectAlbum = (name: string, id: number) => {
    setShowModal(false)
    closeSelectMoveAlbumModal()

    // 백드롭 이벤트
    if (name === "" && id === 0) {
      console.log('백드롭 이벤트')
      setEditMode("normal")
    } else {
      setAlbumName(name)
      setAlbumId(id)
    }

  }

  // 슬래시 새기 함수
  const countSlashes = (str: string): number => {
    // 정규 표현식을 사용하여 '/' 문자의 개수를 센다
    const regex = /\//g;
    const matches = str.match(regex);

    // '/' 문자의 개수를 반환한다
    return matches ? matches.length : 0;
  };

// 이미지 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      // 여러 파일을 업로드할 수 있도록 multiple 속성이 설정된 경우
      const formData = new FormData();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // 선택된 각 파일을 FormData에 추가
        formData.append("images[]", file);
      }
      // 서버로 선택된 모든 파일을 업로드
      uploadImages(formData);
    }
  };

// 선택된 파일들을 서버에 업로드하는 함수
  const uploadImages = (formData: FormData): void => {
    console.log('서버 업로드')
    console.log(formData)
    // 서버로 HTTP 요청을 보내는 코드 작성

  };


  // 카메라 버튼 클릭 처리
  const handleCameraButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // 뒤로가기 고려한 상태 변경
  useEffect(() => {
    // 이동될때마다 데이터 청소
    setEditMode("normal")
    setShowModal(false)
    editPhotoIdList.clear()

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

        { /* 모든 사진 탭 */}
        <Link to="/photo/day"
              className={activeTab === "all" ? "photo-tab-container__button active" : "photo-tab-container__button"}
              onClick={() => handleTabClick("all")}>모든 사진</Link>

        { /* 앨범 사진 탭 */}
        <Link to="/photo/album"
              className={activeTab === "album" ? "photo-tab-container__button active" : "photo-tab-container__button"}
              onClick={() => handleTabClick("album")}>앨범 사진</Link>

        { /* 편집 버튼은 월, 년 탭에서만 보이지 않음*/}
        {(activeTab === "all" && allPhotoTab === "day") || activeTab === "album" || countSlashes(location.pathname) > 2 ?
          editMode === "delete" ?

            <RiDeleteBin6Line className="photo-tab-container__plus-button" size={25}
                              onClick={handleEndEditMode}/>

            : editMode === "makeAlbum" || editMode === "moveAlbum" ?

              <LuFolderInput className="photo-tab-container__plus-button" size={22}
                             onClick={handleEndEditMode}/>
              :
              <FiEdit className="photo-tab-container__plus-button" size={20}
                      onClick={handleOpenEditModal}/>
          :
          null
        }

      </div>

      { /* 모든 사진 탭에서만 하단 탭이 보임 */}
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

      {/* 실질적으로 사진 입력을 받는 요소 - 여러장 */}
      <input
        type="file"
        accept="image/*"
        style={{display: 'none'}}
        ref={fileInputRef}
        onChange={handleImageChange}
        multiple={true}
      />

      { /* 사진 추가 / 제출 이벤트 버튼 */}
      {editMode === "delete" ?
        <button className="photo__button-add-event">
          <RiDeleteBin6Line className="photo-tab-container__plus-button" size={25}
                            onClick={handleEndEditMode}/>
        </button>
        : editMode === "makeAlbum" || editMode === "moveAlbum" ?
          <button className="photo__button-add-event">
            <LuFolderInput className="photo-tab-container__plus-button" size={25}
                           onClick={handleEndEditMode}/>
          </button>
          :
          activeTab === "all" && editMode === "normal" ?
            <button className="photo__button-add-event">
              <FaPlus size={22} onClick={handleCameraButtonClick}/>
            </button>
            :
            null
      }


      { /* 모달 */}
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

      {
        showSelectMoveAlbumModal ?
          <SelectAlbumModal handleSelectAlbum={handleSelectAlbum}/>
          :
          null
      }
    </div>
  );
}


export default PhotoIndex;
