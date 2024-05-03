import React, { useState } from 'react';
import { HiOutlinePlus } from "react-icons/hi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState<string | null>(null);
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

  // 메시지 입력 핸들러
  const handleSetMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(event.target.value);
  }

  return (
    <div className="chat-input">
      {/*플러스 버튼 - 클릭 시 카메라 및 약속 버튼 렌더링*/}
      <button className="chat-input__button-plus">
        <HiOutlinePlus size={24}/>
      </button>

      <div className="chat-input__botton-wrapper">
        {/*약속 메시지 작성 버튼*/}
        <button className="chat-input__botton-appointment">

        </button>

        {/*사진 전송 버튼*/}
        <button className="chat-input__button-camera">

        </button>
      </div>

      <div className="chat-input__field">
        {/*입력창*/}
        <TextField
          fullWidth
          multiline
          maxRows={4}
          value={inputMessage}
          onChange={handleSetMessage}
          placeholder="메시지를 전달해 보세요"
          inputProps={{ maxLength: 1000 }}
          sx={muiFocusCustom}
          size="small"
          className="chat-input__input"
        />

        {/*이모티콘 버튼*/}
        <button className="chat-input__button-emoji">
          <SlEmotsmile size={24} />
        </button>

        {/*전송 버튼*/}
        <button className="chat-input__button-send">
          <PiPaperPlaneRightFill size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatInput;