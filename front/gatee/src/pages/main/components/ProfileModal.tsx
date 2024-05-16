import React, {useState} from 'react';
import {MemberApiRes} from "@type/index";
import TextField from "@mui/material/TextField";
import {IoSend} from "react-icons/io5";
import {InputAdornment} from "@mui/material";
import getMoodEmoji from "@utils/getMoodEmoji";
import getMoodContent from "@utils/getMoodContent";
import {useMemberStore} from "@store/useMemberStore";

interface ProfileModalProps {
  profileData: MemberApiRes | null,
  handleModalEvent: (type: string, content: string) => void
}

const ProfileModal = ({profileData, handleModalEvent}: ProfileModalProps) => {
  const {myInfo} = useMemberStore()
  // 한마디 보내기 버튼 누르기 상태 관리
  const [isSendBtnClicked, setIsSendBtnClicked] = useState(false);
  // 메세지 입력 상태
  const [messageInput, setMessageInput] = useState("");

  // 모달 이벤트 관리
  const handleProfileEvent = (event:
                                React.MouseEvent<HTMLButtonElement>
                                | React.MouseEvent<HTMLDivElement>
    , type: string) => {
    event.stopPropagation();

    if (type === "gotoProfile") {
      handleModalEvent(type, "");
    } else if (type === "openMessage") {
      setIsSendBtnClicked(!isSendBtnClicked);
    } else if (type === "sendMessage") {
      handleModalEvent(type, messageInput);
    } else if (type === "close") {
      handleModalEvent(type, "");
    }
  };

  // 메세지 상태 저장
  const handleMessageInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    setMessageInput(event.target.value);
  };

  // input 커스텀
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
  return (
    <div className="profile-modal--bg"
         onClick={(event) => handleProfileEvent(event, "close")}>
      {/* 모달 내용 */}
      <div className="profile-modal--content">

        {/* 닉네임 */}
        <div className="profile-nickname">{profileData?.nickname}</div>

        {/* 기분 */}
        {profileData?.mood ?
          <div className="profile-mood">
            오늘 {getMoodContent(profileData?.mood)} {getMoodEmoji(profileData?.mood)}
          </div>
          :
          <div className="profile-mood">
            오늘 기분을 설정하지 않았어요 😶
          </div>
        }


      {/* 버튼 */}
      <div className="profile-modal--button--container">

        <button className={profileData?.memberId !== myInfo.memberId ? "profile-modal-go-to-detail":"profile-modal-go-to-detail flex-1"}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  handleProfileEvent(event, "gotoProfile")
                }}>
          프로필
        </button>

        {profileData?.memberId !== myInfo.memberId ?
        <button className="profile-modal-open-message"
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                  handleProfileEvent(event, "openMessage")
                }}>
          한마디 보내기
        </button>

        :null}
      </div>

      {/* 메세지 인풋 창 */}
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

                     onClick={(event) => event.stopPropagation()}
                     inputProps={{maxLength: 25}}
                     InputProps={{
                       endAdornment: (
                         <InputAdornment position="end">

                           {/* 메세지 입력값 없으면 비활성화 */}
                           <button className="send-message-button"
                                   onClick={(event) => handleProfileEvent(event, "sendMessage")}
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
  ;
};

export default ProfileModal;
