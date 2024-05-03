import React, {useRef, useState} from 'react';
import { IoIosCamera } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { MemberInfoSample } from "@constants/index";

function ProfileIndex() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedProfileImage, setSelectedProfileImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [createdCharacter, setCreateCharacter] = useState<string>("");

  // 이미지 선택 처리
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProfileImage(reader.result);
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

  return (
    <div className="profile-index">
      <div className="profile-index__profile">
        <div className="profile__img-box">
          {selectedProfileImage ? (
            <img
              className="img-box__img"
              src={selectedProfileImage.toString()}
              alt="profile-image"
            />
          ) : (
            <img
              className="img-box__img"
              src={MemberInfoSample.image}
              alt="profile-image"
            />
          )}
          <input
            type="text"
            accept="image/*"
            style={{ display: 'none' }}
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
        <div className="profile__nickname">
          <span className="profile__nickname--text">
            {MemberInfoSample.nickname}
          </span>
        </div>
        <div className="profile__name">
          <span className="profile__name--text">
            {MemberInfoSample.name}
          </span>
        </div>
        <div className="profile__mood-box">
          <span className="mood-box__title">
            오늘 기분이 어때요?
          </span>
          <button
            className="mood-box__btn"
          >
            <img
              src=""
              alt=""
            />
          </button>
        </div>
        <div className="profile__role">
          <div className="role__title">
            <span className="role__title--text">
              역할
            </span>
          </div>
          <div className="role__body">
            <span className="role__body--text">
              {MemberInfoSample.role}
            </span>
          </div>
        </div>
        <div className="profile__birth">
          <div className="birth__title">
            <span className="birth__title--text">
              생년월일
            </span>
          </div>
          <div className="birth__body">
            <span className="birth__body--text">
              {MemberInfoSample.birth}
            </span>
          </div>
        </div>
        <div className="profile__phone">
          <div className="phone__title">
            <span className="phone__title--text">
              전화번호
            </span>
          </div>
          <div className="phone__body">
            <span className="phone__body--text">
              010-8806-8489
            </span>
          </div>
        </div>
      </div>
      <div className="profile-index__character">
        {createdCharacter ? (
          <div className="character__created">
            <div className="created__title">
              <span className="created__title--text">
                오늘의 한줄 정보
              </span>
            </div>
            <div className="created__character-box">
              <div className="character-box__question">

              </div>
              <div className="character-box__answer">

              </div>
              <button
                className="character-box__btn-detail"
              >
                <span className="btn-detail--text">
                  나의 백과사전 보러가기
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="character__non-created">
            <button className="non-created__btn">
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