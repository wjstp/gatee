import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import { ReactComponent as PencilIcon } from "@assets/images/icons/ic_pencil.svg";
import { ReactComponent as Book} from "@assets/images/character/book.svg";
import { useModalStore } from "@store/useModalStore";
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import FeelingToast from "@pages/profile/components/FeelingToast";
import { useMemberStore } from "@store/useMemberStore";
import { useFamilyStore } from "@store/useFamilyStore";
import { useDictStore } from "@store/useDictStore";
import dayjs from "dayjs";
import { createFamilyCodeApi, getMyDataApi } from "@api/member";
import { AxiosError, AxiosResponse } from "axios";
import { getFamilyAnsweredAskApi } from "@api/dictionary";
import useModal from "@hooks/useModal";
import getMoodContent from "@utils/getMoodContent";
import { Dictionary } from "@fullcalendar/core/internal";
import { IoMdRefresh } from "react-icons/io";
import {naggingApi} from "@api/notification";

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const ProfileIndex = () => {
  const navigate = useNavigate();
  // 모달 상태 적용
  const { setShowModal } = useModalStore();
  const { myInfo, setMyInfo } = useMemberStore();
  const { familyInfo, setFamilyCode } = useFamilyStore();
  const { askList, setAskList } = useDictStore();
  // 쿼리스트링으로 넘어온 이메일을 확인하기 위함
  const { email } = useParams<{ email: string }>();
  const { isOpen, openModal, closeModal } = useModal();

  // 열린지 닫힌지 상태 확인 가능
  const [state, setState] = useState({
    bottom: false,
  });

  // 멤버 확인
  const familyMember = familyInfo.find(member => member.email === email);
  const [isMe, setIsMe] = useState<boolean>(false);
  // 로딩
  const [loading, setLoading] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState<Dictionary | null>(null);

  // 나로 들어왔는지 확인
  useEffect(() => {
    // 내가 맞다면 상태 변경 및 정보 조회하기
    if (email === myInfo.email) {
      setIsMe(true);
      saveMemberData();
      getFamilyAnsweredAsk(myInfo.memberFamilyId);
    } else {
      setIsMe(false);
      getFamilyAnsweredAsk(familyMember?.memberFamilyId);
    }
  }, [email]);

  // 기분 확인
  useEffect(() => {
    if (familyMember) {
      const yourMood = getMoodContent(familyMember.mood);
    }
  }, [familyMember?.mood]);

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
    toggleDrawer('bottom', false)(event);
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

  // 정보 불러오기 Api
  const saveMemberData = () => {
    getMyDataApi(
      (res) => {
        console.log("내 정보 조회",res.data)
        // 스토어에 저장
        setMyInfo(res.data)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // 가족 코드 생성
  const createFamilyCode = () => {
    createFamilyCodeApi(
      {
        familyId: myInfo.familyId,
      },
      (res: AxiosResponse<any>) => {
        console.log("코드 생성 성공", res);
        // 가족 코드 집어넣기
        setFamilyCode(res.data.familyCode);
        navigate("/signup/member-set/share", {
          state: {
            from: 'profile'
          }
        });
      },
      (err: AxiosError<any>): void => {
        console.log(err);
      }
    ).then().catch();
  }

  // 수정으로 넘어가기
  const goToModify = () => {
    navigate(`/profile/${email}/modify`)
  }

  // 날짜 형식 변환 함수
  const changeDate = (originalDate: string): string => {
    const formattedDate: string = dayjs(originalDate).format("YYYY.MM.DD");

    return formattedDate;
  }

  // 내 백과사전 이동
  const handleCharacter = (): void => {
    navigate(`/character`);
  }

  // 백과사전 푼 문제 조회
  const getFamilyAnsweredAsk = (memberFamilyId: number | undefined) => {
    if (memberFamilyId) {
      getFamilyAnsweredAskApi(
        memberFamilyId,
        (res: AxiosResponse<any>) => {
          console.log("다른 사람 백과사전 푼 문제 상태", res);
          setAskList(res.data);
          getRandomQuestion(res.data);
        },
        (err: AxiosError<any>) => {
          console.log(err);
        }
      )
    }
  }
  
  // 랜덤 문제 만들기
  const getRandomQuestion = (arr: Dictionary[]) => {
    if (!arr.length) {
      return null;
    } else {
      const randomIndex = Math.floor(Math.random() * arr.length);
      setRandomQuestion(arr[randomIndex]);
    }
  };

  // 백과사전 보러 가기
  const goToCharacter = () => {
    navigate(`/character/start/${familyMember?.memberFamilyId}`);
  }
  
  // 한마디 보내기
  const sendNaggingMessage = () => {
    const content: string = "백과사전 만들어!"
    if (familyMember) {
      naggingApi(
        {
          receiverId: familyMember?.memberId,
          message: content
        }, res => {
          console.log(res);
          alert(`사전을 만들어 달라고 했어요!`)
        }, err => {
          console.log(err);
          // 로딩
          setLoading(true)
          setTimeout(()=>setLoading(false), 1000)
        }
      )
    }
  }

  return (
    <div className="profile-index">

      {/*가족 초대 버튼*/}
      {familyMember?.isLeader && isMe ? (
        <div className="profile__invite-box">
          <button
            className="invite-box__btn"
            onClick={createFamilyCode}
          >
            <div className="btn--text">
              초대하기
            </div>
          </button>
        </div>
      ) : (
        null
      )}

      {/*프로필 섹션*/}
      <div className="profile-index__profile">

        {/*프로필 이미지*/}
        <div className="profile__img-box">
          <img
            className="img-box__img"
            src={isMe ? (
              myInfo.profileImageUrl
            ) : (
              familyMember?.profileImageUrl
            )}
            alt="profile-image"
          />
        </div>

        {/*닉네임*/}
        <div className="profile__nickname">
          <div className="profile__nickname__part--01">
            {isMe ? (
              myInfo.nickname
            ) : (
              familyMember?.nickname
            )}
            {isMe ? (
              <button
                className="profile__nickname__part--02"
                onClick={goToModify}
              >
                <PencilIcon className="icon" />
              </button>
            ) : (
              null
            )}
          </div>
        </div>

        {/*기분 상태*/}
        <div className="profile__mood-box">
          <React.Fragment key={"bottom"}>
            <button
              className={isMe ? (
                "mood-box__btn"
              ) : (
                "mood-box__btn--disabled"
              )}
              onClick={toggleDrawer("bottom", true)} // 토스트 팝업 열기
            >
              <span className="btn--text">
                오늘 기분이 어때요?&nbsp;&nbsp;&nbsp;
              </span>
              <span className="btn--icon">
                {isMe ? (
                  myInfo.mood ? (
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
                  )
                ) : (
                  familyMember?.mood ? (
                    <>
                      {familyMember?.mood === "HAPPY" && <span>🥰</span>}
                      {familyMember?.mood === "SAD" && <span>😥</span>}
                      {familyMember?.mood === "ALONE" && <span>😑</span>}
                      {familyMember?.mood === "ANGRY" && <span>🤬</span>}
                      {familyMember?.mood === "FEAR" && <span>😱</span>}
                      {familyMember?.mood === "SLEEPY" && <span>😪</span>}
                    </>
                  ) : (
                    <span>😶</span>
                  )
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
                {isMe ? (
                  myInfo.name
                ) : (
                  familyMember?.name
                )}
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
                {isMe ? (
                  myInfo.role
                ) : (
                  familyMember?.role
                )}
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
                {isMe ? (
                  changeDate(myInfo.birth as string)
                ) : (
                  changeDate(familyMember?.birth as string)
                )}
              </span>
              <span className="birth__body__part--02">
                {isMe ? (
                  myInfo.birthType === "SOLAR" ? (null) : (" (음력)")
                ) : (
                  familyMember?.birthType === "SOLAR" ? (null) : (" (음력)")
                )}
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
              {isMe ? (
                myInfo.phoneNumber ? (
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
                )
              ) : (
                familyMember?.phoneNumber ? (
                  <>
                    <span className="phone__body__part--01">
                      {familyMember?.phoneNumber}
                    </span>
                    <a
                      className="phone__body__part--02"
                      href={`tel:${familyMember?.phoneNumber}`}
                    >
                      <FaPhone className="icon" />
                    </a>
                  </>
                ) : (
                  <span className="phone__body__part--03">
                    입력되지 않았습니다
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/*백과사전 섹션*/}
      <div className="profile-index__character">

        {askList.length === 0 ? (
          // 사전이 비어있다면

          isMe ? (
            // 내 프로필일 때
            <div className="character__non-created-my">
              <button
                className="non-created-my__btn"
                onClick={handleCharacter}
              >
                <span className="btn--text">
                    내 사전 만들기
                </span>
              </button>
            </div>

          ) : (
            // 내 프로필이 아닐 때
            <div className="character__non-created-other">
              <div className="non-created-other__character-box">
                <div className="character-box__header">
                  <span className="header__part--01">
                    {familyMember?.nickname}
                  </span>
                  <span className="header__part--02">
                    님의 사전이 텅 비어 있어요!
                  </span>
                </div>
                <div className="character-box__body--01">
                  <span className="body--01--text">
                    사전을 만들어 달라고 말해 볼까요?
                  </span>
                </div>
                <div className="character-box__body--02">
                  <button
                    className="body--02__btn"
                    onClick={sendNaggingMessage}
                  >
                    <span className="btn--text">
                      한마디 보내기
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )

        ) : (
          // 사전이 비어있지 않다면

          isMe ? (
            // 내 프로필일 때
            <div className="character__created">
              <div className="created__title">
                <Book
                  className="profile__book-icon"
                />
                <span className="profile__title--text">
                내 백과사전 한줄 정보
              </span>
                <button
                  className="reset-btn"
                  onClick={() => getRandomQuestion(askList)}
                >
                  <IoMdRefresh
                    className="reset-btn--icon"
                    size={20}
                  />
                </button>
              </div>
              <div className="created__character-box">
                <div className="created__character-box__top">
                </div>
                <div className="character-box__header">
                <div className="header__part--01">
                  &nbsp;{randomQuestion ? (
                  randomQuestion.question
                ) : (
                  null
                )}
                </div>
                {/*  <span className="header__part--02">*/}

                {/*</span>*/}
                </div>
                <div className="character-box__body--01">
                <span className="body--01--text">
                  {randomQuestion ? (
                    randomQuestion.answer
                  ) : (
                    null
                  )}
                </span>
                </div>
                <div className="character-box__body--02">
                  <button
                    className="body--02__btn"
                    onClick={goToCharacter}
                  >
                  <span className="btn--text">
                    내 백과사전 수정하기
                  </span>
                  </button>
                </div>
              </div>
            </div>
            
          ) : (
            // 내 프로필이 아닐 때
            <div className="character__created">
              <div className="created__title">
                <Book
                  className="profile__book-icon"
                />
                <span className="profile__title--text">
                오늘의 {familyMember?.nickname} 한줄 정보
              </span>
                <button
                  className="reset-btn"
                  onClick={() => getRandomQuestion(askList)}
                >
                  <IoMdRefresh
                    className="reset-btn--icon"
                    size={20}
                  />
                </button>
              </div>
              <div className="created__character-box">
                <div className="created__character-box__top">
                </div>
                <div className="character-box__header">
                <div className="header__part--01">
                   &nbsp;{randomQuestion ? (
                  randomQuestion.question
                ) : (
                  null
                )}
                </div>
                </div>
                <div className="character-box__body--01">
                <span className="body--01--text">
                  {randomQuestion ? (
                    randomQuestion.answer
                  ) : (
                    null
                  )}
                </span>
                </div>
                <div className="character-box__body--02">
                  <button
                    className="body--02__btn"
                    onClick={goToCharacter}
                  >
                  <span className="btn--text">
                    백과사전 보러 가기
                  </span>
                  </button>
                </div>
              </div>
            </div>
          )
        )}

      </div>

      {/*한마디 보내기*/}
      {/*{isOpen ? (*/}
      {/*  // <NaggingModal*/}
      {/*  //   notificationData={familyMember}*/}
      {/*  //   handleModal={handleModal}*/}
      {/*  // />*/}
      {/*) : (*/}
      {/*  null*/}
      {/*)}*/}

    </div>
  );
}

export default ProfileIndex;
