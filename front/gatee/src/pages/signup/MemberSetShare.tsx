import React, { useEffect } from 'react';
import { BiCopy } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ReactComponent as KaKaoMessage } from "@assets/images/signup/kakao_message.svg";
import { useFamilyStore } from "@store/useFamilyStore";
import { createFamilyCodeApi } from "@api/member";
import { AxiosResponse, AxiosError } from "axios";

const SignupMemberSetShare = () => {
  const navigate = useNavigate();
  const server: string | undefined = process.env.REACT_APP_API_URL;

  const { familyName, stringImage, familyId, familyCode, setFamilyCode } = useFamilyStore();

  const goToMemberSet = () => {
    navigate("/signup/member-set");
  }
  
  // 카카오 공유하기 버튼
  const kakaoMessage = () => {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: familyCode,
        imageUrl:
          'https://spring-learning.s3.ap-southeast-2.amazonaws.com/default/family.jpg',
        link: {
          mobileWebUrl: server,
          webUrl: server,
        },
      },
      itemContent: {
        profileText: `${familyName} 가족에서 초대가 왔어요!`,
        profileImageUrl: stringImage,
        titleImageText: '아래 코드를 복사해 들어오세요!',
      },
      buttons: [
        {
          title: '가티로 이동',
          link: {
            mobileWebUrl: server,
            webUrl: server,
          },
        },
      ],
    });
  }

  // 가족 코드 생성하기
  useEffect(() => {
    // createFamilyCode();
  }, []);

  // 초대 코드를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    navigator.clipboard.writeText(familyCode).then(() => {
      alert("초대 코드가 클립보드에 복사되었습니다.");
    }).catch(err => {
      console.error('클립보드 복사에 실패했습니다', err);
    });
  }

  return (
    <div className="signup-family-set-share">

      {/*제목*/}
      <div className="signup-family-set-share__title">
        <span className="title__part--01">가족을 초대</span>
        <span className="title__part--02">해 봐요</span>
      </div>

      {/*가족 이미지*/}
      <div className="signup-family-set-share__img">
        <img
          className="img"
          src={stringImage}
          alt="family-image"
        />
      </div>

      {/*가족 이름*/}
      <div className="signup-family-set-share__name">
        <span className="name">
          {familyName}
        </span>
      </div>

      {/*코드 박스*/}
      <div className="signup-family-set-share__code-box">
        {/*코드 문구*/}
        <span className="code-box__text">
          초대 코드
        </span>
        {/*코드*/}
        <span className="code-box__code">
          {familyCode}
        </span>
        {/*복사 버튼*/}
        <div className="code-box__btn">
          <button
            className="btn-copy"
            onClick={copyToClipboard}
          >
            <BiCopy
              className="btn-copy__icon"
              size={24}
            />
          </button>
        </div>
      </div>

      {/*유효기간 메시지*/}
      <div className="signup-family-set-share__message">
        <span className="message--text">
          초대 코드는 하루가 지나면 초기화돼요!
        </span>
      </div>

      {/*카카오톡 공유하기 버튼*/}
      <div className="signup-family-set-share__btn-kakao">
        <button
          className="btn-kakao__btn"
          onClick={kakaoMessage}
        >
          <KaKaoMessage className="btn-kakao__icon" />
        </button>
      </div>

      {/* 다음 버튼 */}
      <div className="signup-family-set-share__btn-next">
        <button
          className="btn-next__btn"
          onClick={goToMemberSet}
        >
          <span className="btn__text">
            다음
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignupMemberSetShare;