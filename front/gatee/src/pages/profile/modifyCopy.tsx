import React, {useRef, useState} from 'react';
import {IoIosCamera} from "react-icons/io";
import {useNavigate, useParams} from "react-router-dom";
import {MemberInfoSample} from "@constants/index";
import useModal from "@hooks/useModal";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import {DateField} from '@mui/x-date-pickers/DateField';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';

import {useMemberStore} from "@store/useMemberStore";
import Checkbox from "@mui/material/Checkbox";
import {FormControlLabel} from "@mui/material";

const ProfileModifyCopy = () => {
  const navigate = useNavigate();
  // 쿼리스트링으로 넘어온 이름을 확인하기 위함
  const {name} = useParams<{ name: string }>();
  // 멤버 불러오기
  const member = MemberInfoSample;

  // 이미지 관련
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [memberImage, setMemberImage] = useState<string | ArrayBuffer | null>(member.image);
  // 닉네임 관련
  const inputNicknameRef = useRef<HTMLInputElement>(null);
  const [inputNickname, setInputNickname] = useState<string>(member.nickname);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState<string>("");
  // 이름 관련
  const inputNameRef = useRef<HTMLInputElement>(null);
  const [inputName, setInputName] = useState(member.name);
  const [nameErrorMessage, setNameErrorMessage] = useState<string>("");

  // 역할 관련
  const roles = ["엄마", "아빠", "아들", "딸", "입력"];
  const inputRoleRef = useRef<HTMLInputElement>(null);
  const [inputRole, setInputRole] = useState<string>(member.role);
  const [customRole, setCustomRole] = useState<string>("");
  const [isCustomRole, setIsCustomRole] = useState<boolean>(false);
  const [roleErrorMessage, setRoleErrorMessage] = useState<string>("");
  // 생일 관련
  const inputBirthDayRef = useRef<HTMLInputElement>(null);
  const [inputBirthDay, setInputBirthDay] = useState<string | null>(member.birth);
  const [birthDayErrorMessage, setBirthDayErrorMessage] = useState<string>("");
  // 캘린더타입
  const [inputBirthType, setInputBirthType] = useState<string>(member.birthType)
  // 전화번호 관련
  const [inputPhoneNumber, setInputPhoneNumber] = useState<string | null>(member.phoneNumber)

  // 모달 관련
  const {isOpen: isNameModalOpen, openModal: openNameModal, closeModal: closeNameModal} = useModal();
  const {isOpen: isRoleModalOpen, openModal: openRoleModal, closeModal: closeRoleModal} = useModal();
  const {isOpen: isBirthModalOpen, openModal: openBirthModal, closeModal: closeBirthModal} = useModal();


  // 수정 버튼
  const goToModified = () => {
    // 회원 정보 수정
    // axios.patch
    navigate(`/profile/${name}`)
  }

  // 날짜 형식 변환 함수
  const changeDate = (originalDate: string): string => {
    const date = new Date(originalDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month}.${day}`;
  }

  // 이미지 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMemberImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  // 카메라 버튼 클릭 처리
  const handleCameraButtonClick = (): void => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  // 닉네임 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: string = e.target.value;
    if (value.length <= 8) {
      setInputNickname(value);
      setNicknameErrorMessage("");
    }
  }

  const handleNameModal = (name: string): void => {
    setInputName(name);
    closeNameModal()
  }

  const handleRoleModal = (role: string): void => {
    setInputRole(role);
    closeRoleModal()
  }

  const handleBirthModal = (birth: string): void => {
    setInputBirthDay(birth);
    closeBirthModal()
  }


  return (
    <div className="profile-modify">
      {/*프로필 섹션*/}
      <div className="profile-modify__profile">

        {/*프로필 이미지*/}
        <div className="profile__img-box">
          <img
            className="img-box__img"
            src={memberImage ? memberImage.toString() : member.image}
            alt="profile-image"
          />
          <input
            type="file"
            accept="image/*"
            style={{display: 'none'}}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <button
            className="img-box__btn"
            onClick={handleCameraButtonClick}
          >
            <IoIosCamera
              className="btn__icon"
              size={25}
            />
          </button>
        </div>

        {/*닉네임*/}
        <div className="profile__nickname">
          <input
            className="profile__nickname__part--01"
            ref={inputNicknameRef}
            type="text"
            placeholder="닉네임"
            value={inputNickname}
            onChange={handleNicknameChange}
            maxLength={8}
            autoFocus
          />
        </div>

        {/*정보 박스*/}
        <div className="profile__info-box">
          <div className="info-box__name">
            <div className="name__title">
              <span className="name__title--text">
                이름
              </span>
            </div>
            <div className="name__body"
                 onClick={openNameModal}>
              <div className="name__body--text">
                {inputName}
              </div>
            </div>
          </div>

          <div className="info-box__role">

            {/* 역할 */}
            <div className="role__title"
            >
              <span className="role__title--text">
                역할
              </span>
            </div>
            <div className="role__body"
                 onClick={openRoleModal}>
              <div className="role__body__part--01">
                {inputRole}
              </div>
            </div>
          </div>

          {/*생년월일*/}
          <div className="info-box__birth">
            <div className="birth__title">
              <span className="birth__title--text">
                생년월일
              </span>
            </div>
            <div className="birth__body" onClick={() => openBirthModal()}>
              <div
                className="birth__body__part--01">
                {inputBirthDay}{inputBirthType==="SOLAR"? "양":"음"}
              </div>
              {/*양력 음력*/}

            </div>
          </div>

          {/* 전화번호 */}
          <div className="info-box__phone">
            <div className="phone__title">
              <span className="phone__title--text">
                전화번호
              </span>
            </div>
            <div className="phone__body">
              <div className="phone__body__part--01"> {inputPhoneNumber} </div>
            </div>
          </div>
        </div>
      </div>

      {/*수정 버튼*/}
      <div className="profile-modify__btn">
        <button
          className="btn-modified"
          onClick={goToModified}
        >
          <span className="btn-modified--text">
              수정하기
          </span>
        </button>
      </div>

      {/*모달*/}
      {isNameModalOpen ?
        <NameModal handleNameModal={(name: string) => handleNameModal(name)}/> : null
      }

      {isRoleModalOpen ?
        <RoleModal handleRoleModal={(role: string) => handleRoleModal(role)} role={inputRole}/> : null
      }

      {isBirthModalOpen ?
        <BirthModal handleBirthModal={(birth: string) => handleBirthModal(birth)} birth={inputBirthDay}/> : null
      }

    </div>
  );
}


// 이름 모달
const NameModal = ({handleNameModal}: { handleNameModal: (name: string) => void }) => {
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
  // 입력상태 - 스토어로 변경할것
  const [inputValue, setInputValue] = useState("안유진");

// 입력값이 변경될 때 호출되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <div className="modal__bg" onClick={() => {
      if (inputValue.trim().length) {
        handleNameModal(inputValue)

      }
    }}>
      <div className="modal__content">
        <TextField value={inputValue} onChange={handleChange} type="text" placeholder="실명을 입력해주세요" sx={muiFocusCustom}
                   onClick={(event) => event.stopPropagation()}
                   autoFocus/>
      </div>
    </div>
  )

}


// 역할 모달
const RoleModal = ({handleRoleModal, role}: { handleRoleModal: (role: string) => void, role: string }) => {
  // 스토어랑 연결할것
  const [inputRole, setInputRole] = useState<string>(role);
  const [isClickedEtc, setIsClickedEtc] = useState<boolean>(false);
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
    setInputRole(event.target.value);
  };


  return (
    <div className="modal__bg" onClick={() => {
    }}>
      <div className="modal__content">
        {/*역할*/}
        <div className="role__container">
          <button
            className={inputRole === "엄마" ? "role__btn selected" : "role__btn"}
            onClick={() => handleRoleModal("엄마")}
          >
          <span className="btn-mom--text">
            엄마
          </span>
          </button>
          <button
            className={inputRole === "딸" ? "role__btn selected" : "role__btn"}
            onClick={() => handleRoleModal("딸")}
          >
          <span className="btn-daughter--text">
            딸
          </span>
          </button>
          <button
            className={inputRole === "아빠" ? "role__btn selected" : "role__btn"}
            onClick={() => handleRoleModal("아빠")}
          >
          <span className="btn-mom--text">
            아빠
          </span>
          </button>
          <button
            className={inputRole === "아들" ? "role__btn selected" : "role__btn"}
            onClick={() => handleRoleModal("아들")}
          >
          <span className="btn-mom--text">
            아들
          </span>
          </button>

          {!isClickedEtc ?
            <button
              className={isClickedEtc ? "role__btn selected" : "role__btn"}
              onClick={() => {
                setIsClickedEtc(true)
                setInputRole("")
              }}
            >
          <span className="btn-etc--text">
            기타
          </span>
            </button>
            : null}
          {isClickedEtc ?
            <div className="etc__container">
              <TextField value={inputRole} onChange={handleChange} type="text" placeholder="역할" sx={muiFocusCustom}
                         onClick={(event) => event.stopPropagation()}
                         autoFocus/>
              <button disabled={inputRole.trim().length === 0}
                      className="role__submit__btn"
                      onClick={() => handleRoleModal(inputRole)}
              >완료
              </button>
            </div>
            :
            null
          }

        </div>
      </div>
    </div>
  )

}


// 생년월일
const BirthModal = ({handleBirthModal, birth}: { handleBirthModal: (birth: string) => void, birth: string | null }) => {

  const {birthDay, birthType, gender, setBirthDay, setBirthType} = useMemberStore();

  const dateFieldCustom = {
    "& .MuiOutlinedInput-root": {
      color: "#000",
      "&.Mui-focused": {
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "#FFBE5C",
          borderWidth: "2px",
        },
      },
    },
    "&.Mui-focused": {
      "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "secondary.main",
        borderWidth: "3px",
      },
    },
  };

// 날짜 형식 검증 함수 (YYYY-MM-DD)
  const isValidDateFormat = (date: string) => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date);
  };

// 날짜 핸들러
  const handleSetSelectedDateChange = (date: Dayjs | null) => {
    setBirthDay(date ? date.format("YYYY-MM-DD") : "");
  };



  return (
    <div className="modal__bg" onClick={() => {
      if (birthDay !== null){
        handleBirthModal(birthDay)
      }}}>
      <div className="modal__content">

        {/*생일 선택*/}
        <div className="birth__container"
        onClick={(event)=>event.stopPropagation()}>
          <div className="birthday-date-field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DateField"]}
              >
                <DateField
                  className="birthday-datefield__input"
                  format="YYYY / MM / DD"
                  autoFocus={true}
                  value={birthDay ? dayjs(birthDay) : null}
                  onChange={handleSetSelectedDateChange}
                  inputProps={{
                    style: {
                      textAlign: "center", fontSize: "23px"
                    },
                  }}
                  sx={dateFieldCustom}
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="birthday-choice">
            <FormControlLabel control={<Checkbox defaultChecked sx={{
              '&.Mui-checked': {
                color: "#FFBE5C",
              },
            }}/>} label="음력" />
          </div>

        </div>


      </div>
    </div>
  )

}

export default ProfileModifyCopy;