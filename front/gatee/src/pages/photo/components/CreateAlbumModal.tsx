import React, {useState} from "react";
import TextField from "@mui/material/TextField";

export const AlbumNameInputModal = ({handleCloseAlbumNameInputModal}: { handleCloseAlbumNameInputModal: () => void }) => {
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
        <TextField value={inputValue} onChange={handleChange} type="text" placeholder="예) 길동이 아기 시절"
                   sx={muiFocusCustom}/>
        {/* 입력값이 비어있지 않으면 버튼 활성화 */}
        <button onClick={handleCreateAlbum} disabled={inputValue.trim() === ""} className="submit-btn">앨범 생성</button>
      </div>
    </div>
  );
};