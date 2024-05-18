import React, {useState} from 'react';
import {NotificationRes} from "@type/index";
import TextField from "@mui/material/TextField";
import {IoSend} from "react-icons/io5";
import {InputAdornment} from "@mui/material";
import {naggingApi} from "@api/notification";
import {useMemberStore} from "@store/useMemberStore";


const NaggingModal = ({notificationData, handleModal}: {
  notificationData: NotificationRes | null | undefined,
  handleModal: () => void // 수정된 부분
}) => {
  const {myInfo} = useMemberStore()
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
    if (notificationData?.senderId)
      naggingApi({
        "receiverId": notificationData?.senderId,
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
        {notificationData?.title.includes("전송되었습니다") ?
          < h2 className="nagging-modal-title">나의 한마디</h2>
          :
          <h2 className="nagging-modal-title">{notificationData?.title}</h2>
      }
      <p className="nagging-modal-content">{notificationData?.content}</p>

      {notificationData?.senderId !== myInfo.memberId ?
        <div className="nagging-modal-btn-container">
          {isSendBtnClicked ? null :
            <button onClick={handleOpenInput} className="orange btn">한마디 보내기
            </button>
          }
          <button onClick={() => handleModal()} className="plane btn">닫기</button>
        </div>
        : <div className="nagging-modal-btn-container">
          <button onClick={() => handleModal()} className="orange btn">닫기
          </button>
        </div>
      }

      {/*한마디 입력창 */}
      {isSendBtnClicked && notificationData?.senderId !== myInfo.memberId ?
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

export default NaggingModal;