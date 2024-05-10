// 수정 모드 고르는 모달
import {useLocation} from "react-router-dom";
import {FiFolderPlus} from "react-icons/fi";
import {MdDriveFileMoveOutline} from "react-icons/md";
import {RiDeleteBin6Line} from "react-icons/ri";
import { TbPencilMinus } from "react-icons/tb";

interface handleSetEditMode {
  handleSetEditMode: (mode: string) => void
}

export const EditModal = ({handleSetEditMode}: handleSetEditMode) => {

  // 버튼 눌렀을때 편집 모드를 설정
  const handleBtn = (event: React.MouseEvent<HTMLDivElement>, mode: string) => {
    // 백드롭 이벤트로 인한 이벤트 버블링 방지
    event.stopPropagation();
    handleSetEditMode(mode)
  }
  const location = useLocation()
  return (
    <div className="edit-modal-bg"
         onClick={(event) => handleBtn(event, "normal")}>

      {/* 모달 내용 */}
      {location.pathname === "/photo/album" ?
        <div className="edit-modal-content">
          {/* 앨범 삭제 */}
          <div className="icon-title-center"
               onClick={(event) => handleBtn(event, "delete")}>
            <RiDeleteBin6Line size={30} color="gray"/>
            <div>
              앨범 삭제
            </div>
          </div>
        </div>

        : location.pathname.includes("/photo/album") ?
          <div className="edit-modal-content">
            {/* 앨범에서 사진 삭제 */}
            <div className="icon-title-center"
                 onClick={(event) => handleBtn(event, "delete")}>
              <RiDeleteBin6Line size={30} color="gray"/>
              <div>
                사진 삭제
              </div>
            </div>

            {/*앨범 이름 수정*/}
            <div className="icon-title-center"
                 onClick={(event) => handleBtn(event, "editName")}>
              <TbPencilMinus size={30} color="gray"/>
              <div>
                이름 수정
              </div>
            </div>
          </div>
          :
          <div className="edit-modal-content">
            {/* 사진 삭제 */}
            <div className="icon-title-center"
                 onClick={(event) => handleBtn(event, "delete")}>
              <RiDeleteBin6Line size={30} color="gray"/>
              <div>
                사진 삭제
              </div>

            </div>
            {/* 앨범 생성 */}
            <div className="icon-title-center"
                 onClick={(event) => handleBtn(event, "makeAlbum")}>
              <FiFolderPlus size={30} color="gray"/>
              <div>앨범 생성
              </div>
            </div>
            {/* 앨범으로 이동 */}
            <div className="icon-title-center"
                 onClick={(event) => handleBtn(event, "moveAlbum")}>
              <MdDriveFileMoveOutline size={30} color="gray"/>
              <div>앨범 이동
              </div>
            </div>

          </div>


      }

    </div>
  )
}