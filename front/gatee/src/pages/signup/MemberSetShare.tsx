import React, { useEffect } from 'react';
import { BiCopy } from "react-icons/bi";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as KaKaoMessage } from "@assets/images/signup/kakao_message.svg";
import { useFamilyStore } from "@store/useFamilyStore";
import base64 from "base-64";

const SignupMemberSetShare = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from: string | null = location.state?.from;
  const server: string | undefined = process.env.REACT_APP_API_URL;
  const accessToken: string | null = localStorage.getItem("accessToken");

  const { familyName, stringImage, familyCode } = useFamilyStore();

  // from이 없다면 이동 막기
  useEffect(() => {
    if (!from) {
      if (accessToken) {
        const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
        const decode = base64.decode(payload);
        const json = JSON.parse(decode);

        if (json.authorities[0] === "ROLE_ROLE_USER") {
          alert(`잘못된 접근입니다.`);
          navigate(`/main`);
        } else {
          alert(`잘못된 접근입니다.`);
          navigate(`/kakao`);
        }
      }
    }
  }, []);

  // 마지막 페이지로 이동
  const goToMemberSetFininsh = () => {
    if (from === "member-set") {
      navigate("/signup/member-set/finish", {
        state: {
          from: "member-set"
        }
      });
    } else {
      navigate(-1);
    }
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
        profileText: `가족과 같이 '가티'해요`,
        titleImageText: `'${familyName}' 가족에서 초대가 왔어요~`,
        titleImageCategory: '아래 코드를 복사해서 들어오세요!'
      },
      buttons: [
        {
          title: '가티로 이동해봐요',
          link: {
            mobileWebUrl: server,
            webUrl: server,
          },
        },
      ],
    });
  }

  // 초대 코드를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    navigator.clipboard.writeText(familyCode)
      .then()
      .catch(err => {
        console.error('클립보드 복사에 실패했습니다', err);
      });
  }

  return (
    <div className="signup-member-set-share slide-in">

      {/*제목*/}
      <div className="signup-member-set-share__title">
        <span className="title__part--01">가족을 초대</span>
        <span className="title__part--02">해 봐요</span>
      </div>

      {/*가족 이미지*/}
      <div className="signup-member-set-share__img">
        <img
          className="img"
          src={stringImage}
          alt="family-image"
        />
      </div>

      {/*가족 이름*/}
      <div className="signup-member-set-share__name">
        <span className="name">
          {familyName}
        </span>
      </div>

      {/*코드 박스*/}
      <div className="signup-member-set-share__code-box">
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
      <div className="signup-member-set-share__message">
        <span className="message--text">
          초대 코드는 하루가 지나면 초기화돼요!
        </span>
      </div>

      {/*카카오톡 공유하기 버튼*/}
      <div className="signup-member-set-share__btn-kakao">
        <button
          className="btn-kakao__btn"
          onClick={kakaoMessage}
        >
          <KaKaoMessage className="btn-kakao__icon" />
        </button>
      </div>

      {/* 다음 버튼 */}
      <div className="signup-member-set-share__btn-next">
        <button
          className="btn-next__btn"
          onClick={goToMemberSetFininsh}
        >
          <span className="btn__text">
            {from === "member-set" ? (
              "다음"
            ) : (
              "돌아가기"
            )}
          </span>
        </button>
      </div>

    </div>
  );
};

export default SignupMemberSetShare;