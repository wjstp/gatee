import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { requestPermission } from "../../firebase-messaging-sw";
import base64 from "base-64";

const SignupPermission = () => {
  const navigate = useNavigate();
  const accessToken: string | null = localStorage.getItem("accessToken");

  // 체크박스
  const [allChecked, setAllChecked] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [pushChecked, setPushChecked] = useState(false);
  const [cameraChecked, setCameraChecked] = useState(false);

  // 권한에 따라 redirect
  useEffect(() => {
    if (accessToken) {
      const payload: string = accessToken.substring(accessToken.indexOf('.')+1,accessToken.lastIndexOf('.'));
      const decode = base64.decode(payload);
      const json = JSON.parse(decode);

      if (json.authorities[0] === "ROLE_ROLE_USER") {
        alert(`잘못된 접근입니다.`);
        navigate(`/main`);
      }
    }
  }, []);

  // 멤버 생성
  const goToFamilyJoin = () => {
    // 푸시알림 권한 요청 함수
    requestPermission();

    // 코드 입력으로 넘어가기
    navigate("/signup/family-join");
  }

  // 모두 동의 상태 관리
  useEffect(() => {
    if (privacyChecked && pushChecked && cameraChecked) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [privacyChecked, pushChecked, cameraChecked]);

  // 모두 동의 체크 버튼
  const handleAllCheck = () => {
    if (allChecked) {
      setPrivacyChecked(false);
      setPushChecked(false);
      setCameraChecked(false);
    } else {
      setPrivacyChecked(true);
      setPushChecked(true);
      setCameraChecked(true);
    }
  }

  // 개인 정보 동의 체크 버튼
  const handlePrivacyChecked = () => {
    setPrivacyChecked(!privacyChecked);
  }

  // 푸시 알림 동의 체크 버튼
  const handlePushChecked = () => {
    setPushChecked(!pushChecked);
  }

  // 카메라 권한 동의 체크 버튼
  const handleCameraChecked = () => {
    setCameraChecked(!cameraChecked);
  }

  return (
    <div className="signup-permission slide-in">

      {/*제목*/}
      <div className="signup-permission__title">
        <span className="title__part--01">
          원활한 서비스 이용을 위해
        </span>
        <span className="title__part--02">
          앱 권한을 허용해 주세요
        </span>
      </div>

      {/*체크박스*/}
      <div className="signup-permission__checkbox">

        {/*전체 약관*/}
        <div className="checkbox-all">
          <input
            className="checkbox-all__input"
            type="checkbox"
            checked={allChecked}
            onChange={handleAllCheck}
          />
          <label className="checkbox-all__label">
            <span className="label__text">
              약관에 모두 동의
            </span>
          </label>
        </div>

        {/*개인 정보 약관*/}
        <div className="checkbox-privacy">
          <input
            className="checkbox-privacy__input"
            type="checkbox"
            checked={privacyChecked}
            onChange={handlePrivacyChecked}
          />
          <label className="checkbox-privacy__label">
            <span className="label__part--01">
              개인 정보 (필수)
            </span>
            <span className="label__part--02">
              이름, 생년월일, 성별
            </span>
          </label>
        </div>

        {/*푸시 알림 약관*/}
        <div className="checkbox-push">
          <input
            className="checkbox-push__input"
            type="checkbox"
            checked={pushChecked}
            onChange={handlePushChecked}
          />
          <label className="checkbox-push__label">
            <span className="label__part--01">
              푸시 알림 (필수)
            </span>
            <span className="label__part--02">
              채팅, 일정, 앨범, 한마디, 기념일
            </span>
          </label>
        </div>

        {/*카메라 약관*/}
        <div className="checkbox-camera">
          <input
            className="checkbox-camera__input"
            type="checkbox"
            checked={cameraChecked}
            onChange={handleCameraChecked}
          />
          <label className="checkbox-camera__label">
            <span className="label__part--01">
              카메라/앨범 (필수)
            </span>
            <span className="label__part--02">
              프로필, 가족 이미지, 앨범, 채팅
            </span>
          </label>
        </div>

      </div>

      {/*다음 버튼*/}
      <div className="signup-permission__btn">
        <button
          className="btn-next"
          onClick={goToFamilyJoin}
          disabled={!allChecked} // 모두 동의 체크되지 않으면 비활성화
        >
            <span className="btn-next__text">
              다음
            </span>
        </button>
      </div>

    </div>
  );
};

export default SignupPermission;