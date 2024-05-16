import React, {useState} from 'react';
import {MemberApiRes, NotificationRes} from "@type/index";
import TextField from "@mui/material/TextField";
import {IoSend} from "react-icons/io5";
import {InputAdornment} from "@mui/material";
import {naggingApi} from "@api/notification";


const MissionNaggingModal = ({memberInfo, handleModal}: {
  memberInfo: MemberApiRes | null | undefined,
  handleModal: () => void // 수정된 부분
}) => {

  // 한마디 보내기 버튼 누르기 상태 관리
  const [isSendBtnClicked, setIsSendBtnClicked] = useState(false);
// 메세지 입력 상태
  const [messageInput, setMessageInput] = useState("");


// 메세지 상태 저장
  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setMessageInput(event.target.value);
  };

  const handleOpenInput = () => {
    setIsSendBtnClicked(true);
  }

// input 커스텀
  const muiFocusCustom = {
    "& .MuiOutlinedInput-root": {
      width: "100%",
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFBE5C",
          borderWidth: "2px",
        },
      }
    }
  };

  const sendNagging = () => {
    if (memberInfo?.memberId)
      naggingApi({
        "receiverId": memberInfo?.memberId,
        "message": messageInput
      }, res => {
        console.log(res.data)

      }, err => {
        console.log(err)
      })
    handleModal()
  }

  return (
    <div className="nagging-modal-bg" onClick={() => handleModal()}>
      <div className="nagging-modal-content--container" onClick={(e) => e.stopPropagation()}>
        <h2 className="nagging-modal-title">{memberInfo?.nickname}님에게</h2>
        {/*<p className="nagging-modal-content"></p>*/}

        <div className="nagging-modal-btn-container">
          {isSendBtnClicked ? null :
            <button onClick={handleOpenInput} className="orange btn">한마디 보내기
            </button>
          }
          <button onClick={() => handleModal()} className="plane btn">닫기</button>
        </div>

        {/*한마디 입력창 */}
        {isSendBtnClicked ?
          <div className="message-input--container">

            {
              messageInput.length > 23 ?
                <p className="message-input--warning">최대 25자 가능해요!</p>
                :
                <p className="message-input--no--seen">최대 25자 가능해요!</p>
            }

            {/* 입력 필드  + 보내기 버튼 */}
            <TextField value={messageInput} onChange={handleMessageInput} type="text"
                       className="message-input"
                       multiline={true}
                       placeholder="예) 설거지 해줘!" sx={muiFocusCustom}
                       spellCheck={false}
                       onClick={(event) => event.stopPropagation()}
                       inputProps={{maxLength: 25}}
                       InputProps={{
                         endAdornment: (
                           <InputAdornment position="end">

                             {/* 메세지 입력값 없으면 비활성화 */}
                             <button className="send-message-button"
                                     onClick={sendNagging}
                                     disabled={messageInput.trim() === ""}>
                               <IoSend size={18} color="white"/>
                             </button>

                           </InputAdornment>
                         ),
                       }}
            />

            <p className="message-input--explain">가티가 여러분의 말을 순화시켜 보내요!</p>
            {/* 보내기 버튼 */}
          </div>
          : null
        }
      </div>
    </div>
  )
}

export default MissionNaggingModal;