import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import {GroupPhotoItemProps, PhotoOutletInfoContext, PlusAlbumButton} from "@type/index";
import Checkbox from "@mui/material/Checkbox";
import {AlbumNameInputModal} from "@pages/photo/components/CreateAlbumModal";
import useModal from "@hooks/useModal";
import {useModalStore} from "@store/useModalStore";
import {getAlbumListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import {usePhotoStore} from "@store/usePhotoStore";


const PhotoAlbum = () => {
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  // 모달 상태
  const {setShowModal} = useModalStore()
  const {familyId} = useFamilyStore()
  const {albumList, setAlbumList} = usePhotoStore()

  // 앨범 이름 고르기 모달 상태
  const {
    isOpen: showAlbumNameInputModal,
    openModal: openAlbumNameInputModal,
    closeModal: closeAlbumNameInputModal
  } = useModal();

  // 앨범 이름 모달 띄우기
  const handleModal = () => {
    setShowModal(true);
    openAlbumNameInputModal()
    console.log("모달 팝업")
  }

  // 앨범이름 모달 닫기
  const handleCloseAlbumNameInputModal = () => {
    closeAlbumNameInputModal()
    setShowModal(false)
    console.log('앨범 만들기')
  }

  // 앨범 목록 불러오기 api
  const getAlbumListPhotoApiFunc = () => {
    getAlbumListPhotoApi(
      {familyId: familyId},
      res => {
        console.log(res)
        setAlbumList(res.data)
      },
      err => {
        console.log(err)
      }
    )
  }

  useEffect(() => {
    getAlbumListPhotoApiFunc()
  }, []);

  return (
    <div className="photo-group--container">
      {albumList.map((groupPhotoData, index) => {
        return <GroupItem key={index} groupPhotoData={groupPhotoData} editMode={editMode}
                          handleChecked={handleChecked}/>
      })}
      <PlusAlbum handleModal={handleModal}/>
      {showAlbumNameInputModal ?
        <AlbumNameInputModal handleCloseAlbumNameInputModal={handleCloseAlbumNameInputModal}/>
        :
        null
      }
    </div>
  )
}

const GroupItem = ({editMode, handleChecked, groupPhotoData}: PhotoOutletInfoContext & GroupPhotoItemProps) => {
  const label = {inputProps: {'aria-label': 'Checkbox demo'}};
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const gotoDetail = () => {
    if (editMode === 'normal') {
      navigate(`/photo/album/${groupPhotoData.albumId}/${groupPhotoData.name}`);
    }
  };
  // 체크박스 변동 함수
  const handleCheckBox = () => {
    // 체크박스가 체크 되어있다면 리스트에서 albumId를 제거하고 체크를 푼다
    if (checked) {
      handleChecked(groupPhotoData.albumId, "delete")
      setChecked(false)
    }
    // 체크박스가 체크 되어있지 않다면, 리스트에 albumId를 추가하고 체크를 한다
    else {
      handleChecked(groupPhotoData.albumId, "add")
      setChecked(true)
    }
  }
  return (
    <div onClick={gotoDetail} className="photo-group--item--container">
      {/* 배경 사진 */}
      <img className="photo-item"
           src={groupPhotoData.imageUrl === null ? "https://i.pinimg.com/736x/96/7d/c7/967dc78b80cd745b1ba0e6377048d692.jpg" :
             groupPhotoData.imageUrl} alt={`${groupPhotoData.albumId}`}/>
      {/* 삭제 모드일때만 체크모드 활성화 */}
      {editMode === 'delete' &&
        <Checkbox {...label} className="check-box"
                  checked={checked}
                  onChange={() => handleCheckBox()}
        />}
      <p className="title">{groupPhotoData.name}</p>
    </div>
  )
}


const PlusAlbum = ({handleModal}: PlusAlbumButton) => {

  return (
    <div className="photo-group--item--container">
      {/* 배경 사진 */}
      <div onClick={handleModal} className="plus-album--button-container">
        <FaPlus className="plus-button" size={50}/>
      </div>
      <div className="title text-white">
        추가하기
      </div>

    </div>
  )
}
export default PhotoAlbum;