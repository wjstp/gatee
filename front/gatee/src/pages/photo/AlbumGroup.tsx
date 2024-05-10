import React, {useEffect, useState} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {FaPlus} from "react-icons/fa6";
import {PhotoOutletInfoContext} from "@type/index";
import Checkbox from "@mui/material/Checkbox";
import {AlbumNameInputModal} from "@pages/photo/components/CreateAlbumModal";
import useModal from "@hooks/useModal";
import {useModalStore} from "@store/useModalStore";
import {getAlbumListPhotoApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";

interface GroupPhotoItemProps {
  groupPhotoData: {
    id: number,
    title: string,
    dateTime: string,
    src: string
  }
}

interface PlusAlbumButton {
  handleModal: () => void;
}


const PhotoAlbum = () => {
  const {editMode, handleChecked} = useOutletContext<PhotoOutletInfoContext>();
  // 모달 상태
  const {setShowModal} = useModalStore()
  const {familyId} = useFamilyStore()
  // 월별 대표 사진 샘플 데이터
  const groupPhotoDatas = [
    {id: 1, title: "툔", dateTime: "2024-01-31T12:00:00", src: "https://i.pinimg.com/736x/39/48/76/394876e0e2129f959bd910b65da6f3f8.jpg"},
    {id: 2, title: "예삐리리", dateTime: "2024-02-28T12:00:00", src: "https://i.pinimg.com/564x/6b/67/18/6b67189e1cc9cdc691bb32a5333b1360.jpg"},
    {id: 3, title: "운덩", dateTime: "2024-03-31T12:00:00", src: "https://i.pinimg.com/564x/4f/17/d3/4f17d3b96676946c5bdbaaf5968bbd6b.jpg"},
  ]
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

  useEffect(() => {
    getAlbumListPhotoApi(
      {familyId:familyId},
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    )
  }, []);

  return (
    <div className="photo-group--container">
      {groupPhotoDatas.map((groupPhotoData, index) => {
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
      navigate(`/photo/album/${groupPhotoData.id}`);
    }
  };
  // 체크박스 변동 함수
  const handleCheckBox = () => {
    // 체크박스가 체크 되어있다면 리스트에서 id를 제거하고 체크를 푼다
    if (checked) {
      handleChecked(groupPhotoData.id, "delete")
      setChecked(false)
    }
    // 체크박스가 체크 되어있지 않다면, 리스트에 id를 추가하고 체크를 한다
    else {
      handleChecked(groupPhotoData.id, "add")
      setChecked(true)
    }
  }
  return (
    <div onClick={gotoDetail} className="photo-group--item--container">
      {/* 배경 사진 */}
      <img className="photo-item" src={groupPhotoData.src} alt={`${groupPhotoData.id}`}/>
      {/* 삭제 모드일때만 체크모드 활성화 */}
      {editMode === 'delete' &&
        <Checkbox {...label} className="check-box"
                  checked={checked}
                  onChange={() => handleCheckBox()}
        />}
      <p className="title">{groupPhotoData.title}</p>
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