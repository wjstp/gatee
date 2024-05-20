import React, {useEffect, useRef, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate, useParams} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {RiDeleteBin6Line} from "react-icons/ri";
import {LuFolderInput} from "react-icons/lu";
import {FaPlus} from "react-icons/fa6";
import useModal from "@hooks/useModal";
import {AlbumNameInputModal} from "@pages/photo/components/CreateAlbumModal";
import {EditModal} from "@pages/photo/components/EditModeModal";
import {SelectAlbumModal} from "@pages/photo/components/SelectAlbum";
import {deleteAlbumApi, deleteAlbumPhotoApi, deletePhotoApi, uploadAlbumPhotoApi, uploadPhotoApi} from "@api/photo";
import {imageResizer} from "@utils/imageResizer";
import {uploadFileApi} from "@api/file";
import {useFamilyStore} from "@store/useFamilyStore";
import Loading from "@components/Loading";
import {usePhotoStore} from "@store/usePhotoStore";
import {useShallow} from "zustand/react/shallow";
import {useMissionStore} from "@store/useMissionStore";
import {findAlbumMission, getPossibleAmount} from "@utils/photoMissionHelper";
import {doMissionApi} from "@api/mission";
import {useMemberStore} from "@store/useMemberStore";


const PhotoIndex = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const params = useParams()
  const {familyId} = useFamilyStore()
  const {myInfo} = useMemberStore()
  const [loading, setLoading] = useState(true)
  const {missionList, increaseMissionRange} = useMissionStore()
  // 앨범 미션
  const albumMission = findAlbumMission(missionList)

  const {
    addDetailPhotoGroup,
    removeDetailPhotos,
    removeAlbum,
    removeAlbumDetailPhotos,
  } = usePhotoStore(
    useShallow((state) => ({
      detailPhotoGroup: state.detailPhotoGroup,
      addDetailPhotoGroup: state.addDetailPhotoGroup,
      removeDetailPhotos: state.removeDetailPhotos,
      addAlbumList: state.addAlbumList,
      removeAlbum: state.removeAlbum,
      addDetailAlbumPhotoGroup: state.addDetailAlbumPhotoGroup,
      removeAlbumDetailPhotos: state.removeAlbumDetailPhotos,
    })))

  // 상단 탭 상태 관리 -> 모든 사진 / 앨범사진
  const [activeTab, setActiveTab] = useState("album"); // 현재 경로를 기본값으로 설정
  // 모든 사진의 하단 탭 상태 관리 -> 일 / 월 / 연
  const [allPhotoTab, setAllPhotoTab] = useState("day");
  // 모달 상태
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
  const editPhotoIdList: number[] = [];
  // 수정 모드 선택
  const [editMode, setEditMode] = useState("normal")
  // 목적지가 될 앨범 Id
  const [albumId, setAlbumId] = useState<string | number>(0);
  const [albumName, setAlbumName] = useState("");
  // 추가될 사진
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 활성화된 상단 탭에 대한 상태 변경 => 모든 사진, 앨범 사진
  const handleTabClick = (path: string) => {
    setActiveTab(path);
  };

  // 앨범 삭제
  const deleteAlbumApiFunc = (item: number) => {
    removeAlbum(item)
    deleteAlbumApi(item,
      res => {
        console.log(res)
        // 담아둔 id 리스트 비우기
        editPhotoIdList.length = 0;
      },
      err => {
        console.log(err)
      })
  }

  // 사진 삭제
  const deletePhotoApiFunc = () => {
    removeDetailPhotos(editPhotoIdList)
    deletePhotoApi(
      {photoIdList: editPhotoIdList},
      res => {
        console.log(res)
        // 담아둔 id 리스트 비우기
        editPhotoIdList.length = 0;
      },
      err => {
        console.log(err)
      }
    )
  }

  // 사진 업로드
  const uploadPhotoApiFunc = () => {
    // 사진 업로드 api
    uploadAlbumPhotoApi(
      {
        albumId: albumId,
        photoIdList: editPhotoIdList
      },
      res => {
        console.log(res)
        if (albumMission) {
          doMissionApiFunc(editPhotoIdList.length, albumName)
        }
        editPhotoIdList.length = 0;
        navigate(`/photo/album/${albumId}/${albumName}`)
      },
      err => {
        console.log(err)
      }
    )
  }

  // 앨범 사진 삭제
  const deleteAlbumPhotoApiFunc = () => {
    console.log("앨범 사진 삭제")
    removeAlbumDetailPhotos(editPhotoIdList)
    deleteAlbumPhotoApi(
      {
        photoIdList: editPhotoIdList,
        albumId: albumId
      },
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }

  // 선택 모드 제출 이벤트
  const handleEndEditMode = () => {
    // 삭제 모드일 때
    if (editMode === "delete") {
      if (location.pathname === "/photo/album") {
        // 앨범 삭제
        editPhotoIdList.forEach((item) => {
          deleteAlbumApiFunc(item)
        })
        // 앨범 내 사진 삭제
      } else if (location.pathname.includes("/photo/album")) {
        deleteAlbumPhotoApiFunc()
      } else {
        // 사진 삭제
        deletePhotoApiFunc()
      }
      // 이동 모드일 때
    } else if (editMode === "makeAlbum" || editMode === "moveAlbum") {
      uploadPhotoApiFunc()
    }
    // 편집모드 초기화
    setEditMode("normal")
  }

  // 편집 모달 보이기 이벤트
  const handleOpenEditModal = () => {
    openEditModal();
  }

  // 앨범 이름 입력 모달 닫기 이벤트
  const handleCloseAlbumNameInputModal = (inputValue: string, id: number | string) => {
    // 백드롭 클릭 이벤트로 닫힌다면, 모달도 닫고 편집모드도 normal로 돌아가기
    if (inputValue === "") {
      closeAlbumNameInputModal()
      setEditMode("normal")
    } else {
      setAlbumName(inputValue)
      setAlbumId(id)
      closeAlbumNameInputModal()
    }
  }

  // 편집 모드를 결정하는 함수 => EditModal에서 받은 이벤트 실행 함수
  const handleSetEditMode = (mode: string) => {
    // 편집 모드를 결정한다
    setEditMode(mode)

    if (mode === "normal") {
      // 일반 모드 선택 => 모달을 모두 끈다
      closeEditModeModal()

    } else if (mode === "delete") {
      // 사진 삭제 모드 선택 => 모달을 끄고 편집 모드로 들어간다
      closeEditModeModal()

    } else if (mode === "makeAlbum") {
      // 앨범 생성 모드 선택 => 편집모달을 끄고, 앨범 이름 입력 모달을 킨다
      closeEditModeModal()
      openAlbumNameInputModal()

    } else if (mode === "editName") {
      closeEditModeModal()
    } else {
      // 앨범으로 이동 모드 선택 => 편집 모달을 끄고, 앨범 선택 모달을 킨다
      closeEditModeModal()
      openSelectMoveAlbumModal()
    }
  }

  // 편집할 사진 추가 및 삭제  => AlbumDetailPhotoList 컴포넌트에서 받은 이벤트 실행 함수
  const handleChecked = (photoId: number, type: string) => {
    if (type === "delete") {
      // 체크가 풀린 사진을 삭제한다
      const index = editPhotoIdList.indexOf(photoId);
      if (index !== -1) {
        editPhotoIdList.splice(index, 1);
      }
    } else {
      // 지금 체크된 사진을 추가한다
      if (!editPhotoIdList.includes(photoId)) {
        editPhotoIdList.push(photoId);
      }
    }
  };

  // 앨범 고르기
  const handleSelectAlbum = (name: string, id: number) => {
    closeSelectMoveAlbumModal()

    // 백드롭 이벤트
    if (name === "" && id === 0) {
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

  // 미션 수행
  const doMissionApiFunc = (amount: number, name: string | null) => {

    // 0단계인 어린시절 사진, 1단계인 가족사진, 2단계인 내 사진 채우기 그 이후는 사진 올리기
    if (name === null || name === "어린 시절 사진" && albumMission?.completedLevel === 0
      || name === "가족 사진" && albumMission?.completedLevel === 1
      || name === `${myInfo.name}` && albumMission?.completedLevel === 2) {

      // 올릴 수 있는 점수
      const maxAmount = getPossibleAmount(albumMission, amount)
      console.log("미션 수행 포토 카운트",maxAmount)
      // 미션 수행 API
      doMissionApi({type: "ALBUM", photoCount: maxAmount},
        res => {
          // 상태 저장
          increaseMissionRange("ALBUM", maxAmount)
        }, err => {
          console.log(err)
        })
    }
  }

  // 이미지 선택 처리
  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (event.target.files && event.target.files.length > 0) {

      // 미션 수행
      if (albumMission && albumMission?.completedLevel >= 3) {
        doMissionApiFunc(event.target.files.length, null)
      }

      const files: File[] = Array.from(event.target.files);
      if (files) {
        // 여러 파일을 업로드할 수 있도록 multiple 속성이 설정
        for (const file of files) {
          const resizedFile: File = (await imageResizer(file, 800, 800)) as File;
          const formData = new FormData();
          formData.append("fileType", "ALBUM");
          formData.append('file', resizedFile);
          uploadImages(formData);
        }
      }
    }
  };

// 선택된 파일들을 서버에 업로드하는 함수
  const uploadImages = (formData: FormData): void => {
    let addedPhoto = {
      fileId: 1,
      photoId: 1,
      imageUrl: ""
    }
    // 파일 올리기
    uploadFileApi(formData,
      res => {
        console.log(res)
        addedPhoto.fileId = res.data.fileId
        addedPhoto.imageUrl = res.data.imageUrl
        // 보내줄 사진 데이터
        const payload = {
          familyId: familyId,
          fileId: res.data.fileId
        }
        // 사진 등록하기
        uploadPhotoApi(
          payload,
          res => {
            console.log(res)
            addedPhoto.photoId = res.data.photoId
            addDetailPhotoGroup(addedPhoto)
          }
          , err => {
            console.log(err)
          }
        )
      },
      err => {
        console.log(err)
      })
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
    editPhotoIdList.length = 0;

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
      if (params?.id) {
        setAlbumId(params?.id)

      }
    } else if (location.pathname === "/photo") {
      navigate("album")
    } else {
      setActiveTab("detail")
    }
  }, [location.pathname]);


  useEffect(() => {
    setTimeout(() =>
      setLoading(false), 500)
  }, []);


  return (
    <div className="photo">
      {loading ? <Loading/> : null}

      <div className="photo-tab-container">

        { /* 앨범 사진 탭 */}
        <Link to="/photo/album"
              className={activeTab === "album" ? "photo-tab-container__button active" : "photo-tab-container__button"}
              onClick={() => handleTabClick("album")}>앨범 사진</Link>
        { /* 모든 사진 탭 */}
        <Link to="/photo/day"
              className={activeTab === "all" ? "photo-tab-container__button active" : "photo-tab-container__button"}
              onClick={() => handleTabClick("all")}>모든 사진</Link>


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
