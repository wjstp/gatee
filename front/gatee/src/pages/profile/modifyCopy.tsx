import React, {useRef, useState} from 'react';
import {FaCamera} from "react-icons/fa";
import {useNavigate, useParams} from "react-router-dom";
import {MemberInfoSample} from "@constants/index";
import useModal from "@hooks/useModal";
import TextField from "@mui/material/TextField";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, {Dayjs} from 'dayjs';
import {DateField} from '@mui/x-date-pickers/DateField';
import {DemoContainer} from '@mui/x-date-pickers/internals/demo';
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
  // 이름 관련
  const [inputName, setInputName] = useState(member.name);

  // 역할 관련
  const [inputRole, setInputRole] = useState<string>(member.role);
  // 생일 관련
  const inputBirthDayRef = useRef<HTMLInputElement>(null);
  // const {birthDay, birthType} = useMemberStore();
  const [inputBirthDay, setInputBirthDay] = useState<string>(member.birth);
  const [birthDayErrorMessage, setBirthDayErrorMessage] = useState<string>("");
  // 캘린더타입
  const [inputBirthType, setInputBirthType] = useState<string>(member.birthType)
  // 전화번호 관련
  const [inputPhoneNumber, setInputPhoneNumber] = useState<string>(member.phoneNumber === null ? "" : member.phoneNumber)

  // 모달 관련
  const {isOpen: isNameModalOpen, openModal: openNameModal, closeModal: closeNameModal} = useModal();
  const {isOpen: isRoleModalOpen, openModal: openRoleModal, closeModal: closeRoleModal} = useModal();
  const {isOpen: isBirthModalOpen, openModal: openBirthModal, closeModal: closeBirthModal} = useModal();
  const {isOpen: isPhoneModalOpen, openModal: openPhoneModal, closeModal: closePhoneModal} = useModal();


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

  const handleBirthModal = (birth: string, birthType: string): void => {
    setInputBirthDay(birth);
    setInputBirthType(birthType)
    closeBirthModal()
  }

  const handlePhoneModal = (phone: string): void => {
    setInputPhoneNumber(phone);
    closePhoneModal()
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
            <FaCamera
              className="btn__icon"
              size={20}
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
                실명
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
                {inputBirthDay} ({inputBirthType === "SOLAR" ? "양력" : "음력"})
              </div>

            </div>
          </div>

          {/* 전화번호 */}
          <div className="info-box__phone">
            <div className="phone__title">
              <span className="phone__title--text">
                전화번호
              </span>
            </div>
            <div className="phone__body"
                 onClick={() => openPhoneModal()}>
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
        <NameModal handleNameModal={(name: string) => handleNameModal(name)} name={inputName}/> : null
      }

      {isRoleModalOpen ?
        <RoleModal handleRoleModal={(role: string) => handleRoleModal(role)} role={inputRole}/> : null
      }

      {isBirthModalOpen ?
        <BirthModal handleBirthModal={(birth: string, birthType: string) => handleBirthModal(birth, birthType)}
                    birth={inputBirthDay}
                    birthType={inputBirthType}/>
        :
        null
      }

      {isPhoneModalOpen ?
        <PhoneModal handlePhoneModal={(phone: string) => handlePhoneModal(phone)} phone={inputPhoneNumber}/>
        :
        null
      }

    </div>
  );
}


// 이름 모달
const NameModal = ({handleNameModal, name}: { handleNameModal: (name: string) => void, name: string }) => {

  // 입력상태 - 스토어로 변경할것
  const [inputValue, setInputValue] = useState(name);

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
      <input type="text" value={inputValue}
             className="name__input"
             onChange={handleChange}
             placeholder="실명"
             autoFocus
             onClick={(event) => event.stopPropagation()}/>

    </div>
  )

}


// 역할 모달
const RoleModal = ({handleRoleModal, role}: { handleRoleModal: (role: string) => void, role: string }) => {
  const roles = ["엄마", "아빠", "아들", "딸"];
  const [inputRole, setInputRole] = useState<string>(role);
  const [isClickedEtc, setIsClickedEtc] = useState<boolean>(roles.includes(inputRole) ? false : true);

// 입력값이 변경될 때 호출되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputRole(event.target.value);
  };


  return (
    <div className="modal__bg" onClick={() => {
      if (inputRole!==null && inputRole.trim().length!==0)
      handleRoleModal(inputRole)
    }}>
      <div className="modal__content">
        {/*역할*/}
        <div className="role__container">
          <button
            className={inputRole === "엄마" ? "role__btn selected" : "role__btn"}
            onClick={(event) => {
              event.stopPropagation()
              handleRoleModal("엄마")
            }}
          >
          <span className="btn-mom--text">
            엄마
          </span>
          </button>
          <button
            className={inputRole === "딸" ? "role__btn selected" : "role__btn"}
            onClick={(event) => {
              event.stopPropagation()
              handleRoleModal("딸")
            }}
          >
          <span className="btn-daughter--text">
            딸
          </span>
          </button>
          <button
            className={inputRole === "아빠" ? "role__btn selected" : "role__btn"}
            onClick={(event) => {
              event.stopPropagation()
              handleRoleModal("아빠")
            }}
          >
          <span className="btn-mom--text">
            아빠
          </span>
          </button>
          <button
            className={inputRole === "아들" ? "role__btn selected" : "role__btn"}
            onClick={(event) => {
              event.stopPropagation()
              handleRoleModal("아들")
            }}
          >
          <span className="btn-mom--text">
            아들
          </span>
          </button>

          {!isClickedEtc ?
            <button
              className={isClickedEtc ? "role__btn selected" : "role__btn"}
              onClick={(event) => {
                event.stopPropagation()
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
              <input type="text" value={inputRole}
                     className="role__input"
                     onChange={handleChange}
                     placeholder="역할"
                     autoFocus
                     onClick={(event) => event.stopPropagation()}/>
              <button disabled={inputRole.trim().length === 0}
                      className="role__submit__btn"
                      onClick={(event) => {
                        event.stopPropagation()
                        handleRoleModal(inputRole)
                      }}
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
const BirthModal = ({handleBirthModal, birth, birthType}: {
  handleBirthModal: (birth: string, birthType: string) => void,
  birth: string,
  birthType: string
}) => {

  const [birthday, setBirthday] = useState(birth)
  const [inputBirthType, setInputBirthType] = useState(birthType)
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
    setBirthday(date ? date.format("YYYY-MM-DD") : "");
  };

  return (
    <div className="modal__bg" onClick={() => {
      if (birthday !== null && isValidDateFormat(birthday)) {
        handleBirthModal(birthday, inputBirthType)
      }
    }}>
      <div className="modal__content">

        {/*생일 선택*/}
        <div className="birth__container"
             onClick={(event) => event.stopPropagation()}>
          <div className="birthday-date-field">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={["DateField"]}
              >
                <DateField
                  className="birthday-datefield__input"
                  format="YYYY / MM / DD"
                  autoFocus={true}
                  value={birthday ? dayjs(birthday) : null}
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
            <FormControlLabel control={
              <Checkbox checked={inputBirthType === "SOLAR" ? false : true}
                        onChange={() => setInputBirthType(inputBirthType === "SOLAR" ? "LUNAR" : "SOLAR")}
                        sx={{
                          '&.Mui-checked': {
                            color: "#FFBE5C",
                          },
                        }}/>} label="음력"/>
          </div>

        </div>


      </div>
    </div>
  )

}

const PhoneModal = ({handlePhoneModal, phone}: { handlePhoneModal: (phone: string) => void, phone: string }) => {
  // 입력상태 - 스토어로 변경할것
  const [inputPhone, setInputValue] = useState(phone);

// 입력값이 변경될 때 호출되는 함수
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // 숫자만 남기도록 입력값 필터링
    const filteredInput = input.replace(/\D/g, '');
    // 전화번호 형식에 맞게 포맷팅
    const formattedInput = filteredInput.replace(/(\d{3})(\d{1,4})?(\d{1,4})?/, function (_, p1, p2, p3) {
      let formatted = '';
      if (p2) formatted += `-${p2}`;
      if (p3) formatted += `-${p3}`;
      return p1 + formatted;
    });
    setInputValue(formattedInput);
  };

  return (
    <div className="modal__bg" onClick={() => {
      if (inputPhone !== null && inputPhone.trim().length) {
        handlePhoneModal(inputPhone)
      }
    }}>
      <input type="tel"
             value={inputPhone}
             className="phone__input"
             onChange={handleChange}
             placeholder="전화번호"
             autoFocus
             onClick={(event) => event.stopPropagation()}/>

    </div>
  )
}

export default ProfileModifyCopy;