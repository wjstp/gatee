import React, { useEffect, useState, useRef, ChangeEvent } from 'react';
import { HiOutlinePlus } from "react-icons/hi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";
import { IoIosCamera } from "react-icons/io";
import { HiSpeakerphone } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import TextField from '@mui/material/TextField';


const ChatInput = () => {
  const muiFocusCustom = {
    '& label.Mui-focused': {
      color: '#00ff0000',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#00ff0000',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#00ff0000',
      },
      '&:hover fieldset': {
        borderColor: '#00ff0000',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00ff0000',
      },
    },
  }
  const [inputMessage, setInputMessage] = useState<string>("");
  const [inputFile, setInputFile] = useState<File[] | null>(null);
  const [isOpenPlus, setIsOpenPlus] = useState<boolean>(false);
  const [isOpenAppointment, setIsOpenAppointment] = useState<boolean>(false);
  const [inputPlaceholder, setInputPlaceholder] = useState<string>("");
  const [isOpenPreview, setIsOpenPreview] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 변수 초기화
  const reset = () => {
    setIsOpenPlus(false);
    setIsOpenAppointment(false);
    setIsOpenPreview(false);
    setInputMessage("");
    setInputFile(null);
  }

  // 메시지 전송 핸들러
  const handleSendMessage = () => {
    // FILE & MESSAGE
    if (inputFile && inputMessage) {
      console.log("Send file: ", inputFile);
      console.log("Send message: ", inputMessage);
    }
    // FILE
    else if (inputFile) {
      console.log("Send file: ", inputFile);
    }
    else if (inputMessage) {
      // APPOINTMENT
      if (isOpenAppointment) {
        console.log("Send appointment: ", inputMessage);
      }
      // MESSAGE
      else {
        console.log("Send message: ", inputMessage);
      }
    }
    reset();
  }

  // 메시지 입력 핸들러
  const handleSetMessage = (event: ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  }

  // 약속 버튼 클릭 핸들러
  const handleAppointmentClick = () => {
    setIsOpenAppointment(true);
  }

  // 카메라 버튼 클릭 핸들러
  const handleCameraClick = () => {
    // 파일 선택 대화 상자 열기
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // 파일 선택 핸들러
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setInputFile(Array.from(event.target.files))

      // 미리보기 렌더링
      setIsOpenPreview(true);
    }
  }

  // 미리보기 이미지 삭제 핸들러
  const handlePreviewImageDeleteClick = (index: number) => {
    if (inputFile) {
      const newFiles = [...inputFile];
      newFiles.splice(index, 1);
      setInputFile(newFiles);
    }
  }

  // 파일리스트가 빌 경우 미리보기 닫음
  useEffect(() => {
    if (!inputFile || inputFile.length === 0) {
      setIsOpenPreview(false);
    } else {
      setIsOpenPlus(false);
    }
  }, [inputFile]);

  // input 토글
  useEffect(() => {
    setInputMessage("");
    setInputFile(null);

    if (isOpenAppointment) {
      setInputPlaceholder("가벼운 약속을 잡아 보세요");
    } else {
      setInputPlaceholder("메시지를 전달해 보세요");
    }
  }, [isOpenAppointment]);

  // 미리보기 조건부 렌더링
  const renderPreview = () => {
    return (
      <div className="chat-input__preview__container">
        {/*파일 리스트*/}
        <div className="chat-input__preview__file-list">
          {inputFile && inputFile.map((file: File, index: number) => (
            <div className="chat-input__preview__file-item" key={index}>
              {/*이미지*/}
              <img src={URL.createObjectURL(file)} alt={file.name} />

              {/*삭제 버튼*/}
              <button className="chat-input__preview__close" onClick={() => handlePreviewImageDeleteClick(index)}>
                <IoCloseOutline size={20}/>
              </button>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="chat-input">
      <div className={`chat-input__button-wrapper${isOpenAppointment ? "--disabled" : ""}`}>
        {/*플러스 버튼 - 클릭 시 카메라 및 약속 버튼 렌더링*/}
        <button
          className={`chat-input__button-plus${isOpenPlus ? "--active" : ""}`}
          onClick={() => setIsOpenPlus(!isOpenPlus)}
        >
          <HiOutlinePlus size={24}/>
        </button>

        {/*약속 메시지 버튼*/}
        <button
          className={`chat-input__button-appointment${isOpenPlus ? "--active" : ""}`}
          onClick={handleAppointmentClick}
        >
          <HiSpeakerphone size={20}/>
        </button>

        {/*사진 전송 버튼*/}
        <button
          className={`chat-input__button-camera${isOpenPlus ? "--active" : ""}`}
          onClick={handleCameraClick}
        >
          <IoIosCamera size={24}/>
        </button>

        {/* 파일 선택 */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
          multiple
        />
      </div>

      <div className="chat-input__field">
        {/*입력창*/}
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={inputMessage}
          onChange={handleSetMessage}
          placeholder={inputPlaceholder}
          inputProps={isOpenAppointment? { maxLength: 20 } : { maxLength: 1000 }}
          sx={muiFocusCustom}
          size="small"
          className="chat-input__input"
        />

        {isOpenAppointment ? (
          // 약속 잡기 취소 버튼
          <button className="chat-input__button-cancel" onClick={reset}>
            <IoCloseCircleOutline size={30} />
          </button>
        ) : (
          // 이모티콘 버튼
          <button className="chat-input__button-emoji">
            <SlEmotsmile size={24} />
          </button>
        )}

        {/*전송 버튼*/}
        <button
          className={`chat-input__button-send${isOpenAppointment ? "--appointment" : ""}`}
          onClick={handleSendMessage}
        >
          {isOpenAppointment ? <HiSpeakerphone size={20} /> : <PiPaperPlaneRightFill size={20} />}
        </button>
      </div>

      {/*미리보기 창*/}
      {isOpenPreview && (
        <div className="chat-input__preview">
          {renderPreview()}
        </div>
      )}
    </div>
  )
}

export default ChatInput;
