import React, { useState } from 'react';
import { HiOutlinePlus } from "react-icons/hi";
import { PiPaperPlaneRightFill } from "react-icons/pi";
import { SlEmotsmile } from "react-icons/sl";

const ChatInput = () => {
  const [inputMessage, setInputMessage] = useState<string | null>(null);

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
        <input
          type="text"
          className="chat-input__input"
          placeholder="메시지를 전달해 보세요"
        />

        {/*이모티콘 버튼*/}
        <button className="chat-input__button-emoji">
          <SlEmotsmile size={28} />
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