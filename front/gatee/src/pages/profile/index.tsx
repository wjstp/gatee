import React, {useRef, useState} from 'react';
import { IoIosCamera } from "react-icons/io";
import {useNavigate, useParams} from "react-router-dom";
import { FamilyMemberInfoSample } from "@constants/index";
import { FaPhone } from "react-icons/fa";
import { ReactComponent as PencilIcon } from "@assets/images/icons/ic_pencil.svg";

function ProfileIndex() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { name } = useParams<{ name: string }>();

  const [selectedProfileImage, setSelectedProfileImage] = useState<string | ArrayBuffer | null>(null);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [createdCharacter, setCreateCharacter] = useState<string>("");

  const goToModify = () => {
    navigate("/profile/modify")
  }

  // 멤버 확인
  const familyMember = FamilyMemberInfoSample.find(member => member.nickname === name);

  // 날짜 형식 변환 함수
  const changeDate = (originalDate: string): string => {
    const date = new Date(originalDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month}.${day}`;
  }

  return (
    <div className="profile-index">
      <div className="profile-index__profile">
        <div className="profile__img-box">
          <img
            className="img-box__img"
            src={familyMember?.image}
            alt="profile-image"
          />
        </div>
        <div className="profile__nickname">
          <span className="profile__nickname__part--01">
            {familyMember?.nickname}
          </span>
          <button
            className="profile__nickname__part--02"
            onClick={goToModify}
          >
            <PencilIcon className="icon" />
          </button>
        </div>
        <div className="profile__mood-box">
          <span className="mood-box__title">
            오늘 기분이 어때요?
          </span>
          <button
            className="mood-box__btn"
          >
            <span className="mood-box__btn--text">
              {familyMember?.mood ? (
                <>
                  {familyMember.mood === "HAPPY" && <div>🥰</div>}
                  {familyMember.mood === "SAD" && <div>😥</div>}
                  {familyMember.mood === "ALONE" && <div>😑</div>}
                  {familyMember.mood === "ANGRY" && <div>🤬</div>}
                  {familyMember.mood === "FEAR" && <div>😱</div>}
                  {familyMember.mood === "SLEEPY" && <div>😪</div>}
                </>
              ) : (
                <div>😶</div>
              )}
            </span>
          </button>
        </div>
        <div className="profile__info-box">
          <div className="info-box__name">
            <div className="name__title">
              <span className="name__title--text">
                이름
              </span>
            </div>
            <div className="name__body">
              <span className="name__body--text">
                {familyMember?.name}
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
                {familyMember?.role}
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
                {changeDate(familyMember?.birth as string)}
              </span>
              <span className="birth__body__part--02">
                {familyMember?.birthType === "SOLAR" ? ("(양력)") : ("(음력)")}
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
              {familyMember?.phone ? (
                <>
                  <span className="phone__body__part--01">
                    {familyMember?.phone}
                  </span>
                    <a
                      className="phone__body__part--02"
                      href={`tel:${familyMember?.phone}`}
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