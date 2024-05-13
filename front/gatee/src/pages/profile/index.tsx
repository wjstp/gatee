import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { ReactComponent as PencilIcon } from "@assets/images/icons/ic_pencil.svg";
import { QuestionSample } from "@constants/index";
import { ReactComponent as Book} from "@assets/images/character/book.svg";
import { useModalStore } from "@store/useModalStore";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FeelingToast from "@pages/profile/components/FeelingToast";
import { useMemberStore } from "@store/useMemberStore";
import { useFamilyStore } from "@store/useFamilyStore";
import dayjs from "dayjs";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const ProfileIndex = () => {
  const navigate = useNavigate();
  // 모달 상태 적용
  const { setShowModal } = useModalStore();
  const { myInfo } = useMemberStore();
  const { familyInfo } = useFamilyStore();
  // 쿼리스트링으로 넘어온 이메일을 확인하기 위함
  const { email } = useParams<{ email: string }>();

  // 열린지 닫힌지 상태 확인 가능
  const [state, setState] = React.useState({
    bottom: false,
  });

  // 멤버 확인 -> 나중에는 조회로 가져오기
  const familyMember = familyInfo.find(member => member.email === email);
  
  // 백과사전이 있는지 조회하기 용
  const [createdCharacter, setCreateCharacter] = useState<boolean>(false);

  // MUI 관련 코드 -> 슬라이드 다운 해서 내리기 기능 가능
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        console.log(anchor)
        if (open === true){
          setShowModal(true)
        } else {
          setShowModal(false)
        }
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        setState({...state, [anchor]: open});
      };

  // 설정 탭에서 완료 버튼 누를 때 팝업 내리기
  const handleFinishTab = (event:React.MouseEvent) => {
    toggleDrawer('bottom', false)(event)
  }

  // 토스트 객체
  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: 'auto'
      }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
      style={{backgroundColor:"#7B7B7B"}}
    >
      {/* 토스트 팝업 되는 컴포넌트 넣기 */}
      <FeelingToast handleFinishTab={handleFinishTab}/>
    </Box>
  );
  
  // 수정으로 넘어가기
  const goToModify = () => {
    navigate(`/profile/${email}/modify`)
  }

  // 내 프로필일 때만 프로필 정보와 기분을 수정할 수 있음

  // 날짜 형식 변환 함수
  const changeDate = (originalDate: string): string => {
    const formattedDate: string = dayjs(originalDate).format("YYYY.MM.DD");

    return formattedDate;
  }
  
  // 백과사전 바꾸기
  const handleCharacter = (): void => {
    setCreateCharacter(!createdCharacter);
  }

  console.log(myInfo.mood)

  // 모의고사 예시
  const question = QuestionSample[0];

  return (
    <div className="profile-index">
      {/*프로필 섹션*/}
      <div className="profile-index__profile">
        
        {/*프로필 이미지*/}
        <div className="profile__img-box">
          <img
            className="img-box__img"
            src={familyMember?.fileUrl}
            alt="profile-image"
          />
        </div>
        {/*닉네임*/}
        <div className="profile__nickname">
          <span className="profile__nickname__part--01">
            {myInfo.nickname}
          </span>
          <button
            className="profile__nickname__part--02"
            onClick={goToModify}
          >
            <PencilIcon className="icon" />
          </button>
        </div>
        
        {/*기분 상태*/}
        <div className="profile__mood-box">
          <React.Fragment key={"bottom"}>
            <button
              className="mood-box__btn"
              onClick={toggleDrawer("bottom", true)} // 토스트 팝업 열기
            >
              <span className="mood-box__btn--text">
                오늘 기분이 어때요?&nbsp;&nbsp;&nbsp;
              </span>
              <span className="mood-box__btn--icon">
                {myInfo.mood ? (
                  <>
                    {myInfo.mood === "HAPPY" && <span>🥰</span>}
                    {myInfo.mood === "SAD" && <span>😥</span>}
                    {myInfo.mood === "ALONE" && <span>😑</span>}
                    {myInfo.mood === "ANGRY" && <span>🤬</span>}
                    {myInfo.mood === "FEAR" && <span>😱</span>}
                    {myInfo.mood === "SLEEPY" && <span>😪</span>}
                  </>
                ) : (
                  <span>😶</span>
                )}
              </span>
            </button>
            <SwipeableDrawer
              anchor={"bottom"}
              open={state["bottom"]}
              onClose={toggleDrawer("bottom", false)}
              onOpen={toggleDrawer("bottom", true)}>
              {list("bottom")}
            </SwipeableDrawer>
          </React.Fragment>
        </div>

        {/*정보 박스*/}
        <div className="profile__info-box">
          <div className="info-box__name">
            <div className="name__title">
              <span className="name__title--text">
                실명
              </span>
            </div>
            <div className="name__body">
              <span className="name__body--text">
                {myInfo.name}
              </span>
            </div>
          </div>
          <div className="info-box__role">
            <div className="role__title">
              <span className="role__title--text">
                역할
              </span>
            </div>
            <div className="role__body">
              <span className="role__body--text">
                {myInfo.role}
              </span>
            </div>
          </div>
          <div className="info-box__birth">
            <div className="birth__title">
              <span className="birth__title--text">
                생년월일
              </span>
            </div>
            <div className="birth__body">
              <span className="birth__body__part--01">
                {changeDate(myInfo.birth as string)}
              </span>
              <span className="birth__body__part--02">
                &nbsp;{myInfo.birthType === "SOLAR" ? ("(양력)") : ("(음력)")}
              </span>
            </div>
          </div>
          <div className="info-box__phone">
            <div className="phone__title">
              <span className="phone__title--text">
                전화번호
              </span>
            </div>
            <div className="phone__body">
              {myInfo.phoneNumber ? (
                <>
                  <span className="phone__body__part--01">
                    {myInfo.phoneNumber}
                  </span>
                    <a
                      className="phone__body__part--02"
                      href={`tel:${myInfo.phoneNumber}`}
                    >
                      <FaPhone className="icon" />
                    </a>
                </>
              ) : (
                <span className="phone__body__part--03">
                  입력해주세요
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/*백과사전 섹션*/}
      <div className="profile-index__character">
        {createdCharacter ? (
          <div className="character__created">
            <div className="created__title">
              <span className="created__title--text">
                오늘의 한줄 정보
              </span>
            </div>
            <div className="created__character-box">
              <div className="character-box">
                <div className="character-box__question">
                  <span className="question__part--01">
                    {familyMember?.nickname}
                  </span>
                  <span className="question__part--02">
                  님의 {question.question}
                  </span>
                </div>
                <div className="character-box__answer">
                <span className="answer__part--01">
                  {question.correctAnswer}
                </span>
                </div>
                <div className="character-box__icon">
                  <Book
                    className="icon"
                  />
                </div>
                <div className="character-box__btn">
                  <button
                    className="character-box__btn-detail"
                    onClick={handleCharacter}
                  >
                <span className="btn-detail--text">
                  나의 백과사전 보러가기
                </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="character__non-created">
            <button
              className="non-created__btn"
              onClick={handleCharacter}
            >
              <span className="btn--text">
                  나의 사전 만들기
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileIndex;