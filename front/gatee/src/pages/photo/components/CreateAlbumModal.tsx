import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {createAlbumApi} from "@api/photo";
import {useFamilyStore} from "@store/useFamilyStore";
import {usePhotoStore} from "@store/usePhotoStore";
import {useShallow} from "zustand/react/shallow";

export const AlbumNameInputModal = ({handleCloseAlbumNameInputModal}: {
  handleCloseAlbumNameInputModal: (inputValue: string, id: string | number) => void
}) => {
  // 입력상태
  const [inputValue, setInputValue] = useState("");
  const {familyId} = useFamilyStore()
  const {
    addAlbumList
  } = usePhotoStore(
    useShallow((state)=>({
      addAlbumList:state.addAlbumList,
    })))

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
  const handleCreateAlbum = (event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLDivElement>, type: string) => {
    // 백드롭 이벤트 방지
    event.stopPropagation();
    // 입력값이 비어있지 않을 때만 모달 닫기 함수 호출
    if (type === "input" && inputValue.trim() !== "") {

      // 앨범 생성 Api
      createAlbumApi({
          familyId: familyId,
          name: inputValue,
        },
        res => {
          console.log(res)
          addAlbumList({
            albumId:res.data,
            name:inputValue,
            imageUrl:null,
            PhotoId:null,
          })
          handleCloseAlbumNameInputModal(inputValue, res.data.albumId);
        },
        err => {
          console.log(err)
        })

    } else if (type === "close") {
      handleCloseAlbumNameInputModal("", "");
    }
  };


  return (
    <div className="input-modal-bg"
         onClick={(event: React.MouseEvent<HTMLDivElement>) => handleCreateAlbum(event, "close")}>
      {/* 모달 내용 */}
      <div className="input-modal-content">
        <div className="modal-title">앨범 이름 작성</div>
        {/* 입력값이 변경될 때마다 handleChange 함수 호출 */}
        <TextField value={inputValue} onChange={handleChange} type="text" placeholder="예) 길동이 아기 시절" sx={muiFocusCustom}
                   onClick={(event) => event.stopPropagation()}/>
        {/* 입력값이 비어있지 않으면 버튼 활성화 */}
        <button onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleCreateAlbum(event, "input")}
                disabled={inputValue.trim() === ""} className="submit-btn">앨범 생성
        </button>
      </div>
    </div>
  );
};
