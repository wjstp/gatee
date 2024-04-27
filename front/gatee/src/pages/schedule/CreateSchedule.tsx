import React from 'react';
import { FamilyMemberInfoSample } from "../../constants";
import ProfileImage from '@assets/images/logo/app_icon_orange.png'

const ScheduleCreateSchedule = () => {
  return (
    <div className="create-schedule">
      <div className="create-schedule__input-container">
        <div className="create-schedule__title">일정 등록</div>

        {/*일정 설명*/}
        <div className="create-schedule-info">
          <div className="create-schedule__sub-title">설명</div>

          {/*일정 제목 입력*/}
          <div className="create-schedule-info__input-title">
            <input type="text" placeholder="제목 *"/>
            {/*일정 색상 선택*/}
            <div className="create-schedule-info__input-color">
            </div>
          </div>

          {/*일정 내용 입력*/}
          <div className="create-schedule-info__input-content">
            <input type="text" placeholder="상세 내용"/>
          </div>

          {/*일정 카테고리 선택*/}
          <div className="create-schedule-info__input-category">
            <div className="create-schedule-info__input-category-family">

            </div>
            <div className="create-schedule-info__input-category-individual">

            </div>
          </div>
        </div>

        {/*일정 기간 선택*/}
        <div className="create-schedule-period">
          <div className="create-schedule__sub-title">기간</div>

          {/*일정 날짜 입력*/}
          <div className="create-schedule-period__date">

          </div>

          {/*일정 시간 입력*/}
          <div className="create-schedule-period__time">

          </div>
        </div>

        {/*참여하는 사람*/}
        <div className="create-schedule-participant">
          <div className="create-schedule__sub-title">참여자</div>

          {/* 가족 프로필 */}
          <div className="create-schedule-participant__profile">
            {FamilyMemberInfoSample.map((member, index) => (
              <div key={ index }>
                <div className="create-schedule-participant__profile-image">
                  <img src={ ProfileImage } alt=""/>
                  {/*<img src={ member.image } alt={ member.nickname } />*/}
                </div>
                <div className="create-schedule-participant__profile-nickname">
                  { member.nickname }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/*생성 버튼*/}
      <div className="create-schedule__button-create">
        <button>생성</button>
      </div>
    </div>
  );
}

export default ScheduleCreateSchedule;