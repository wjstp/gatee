import React, {useState} from 'react';
import MissionItem from "@pages/mission/components/MissionItem";
import Slider from "react-slick";
import Improvement from "@pages/mission/components/Improvement";
import {useFamilyStore} from "@store/useFamilyStore";

interface KoreanMentType {
  [key: string]: string;
}

const MissionIndex = () => {
  const [missions, setMissions] = useState([
    {type: "target", content: "백문백답 10개 채우기", range: 0.1, complete: false},
    {type: "pencil", content: "모의고사 풀기", range: 0.2, complete: false},
    {type: "calendar", content: "일정 올리기", range: 1, complete: true},
    // {type: "camera", content: "사진 올리기", range: 1, complete: true},
    {type: "file", content: "앨범에 사진 채우기", range: 1, complete: true},

  ]);
  // 슬라이더 세팅
  var settings
    : {
    dots: boolean,
    // fade:boolean,
    infinite: boolean,
    autoplay: boolean,
    autoplaySpeed: number,
    speed: number,
    slidesToShow: number,
    slidesToScroll: number,
    appendDots: any,
    dotsClass: string
  }
    = {
    dots: true,
    // fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: any) => (
      <div>
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: 'dots_custom'
  };

  //우리 가족 명
  const {familyName}=useFamilyStore()
  // 우리 가족의 개선사항
  const improvement = [
    "heart",
    "about",
    "hello",
    "calendar"
  ]

  // 개선사항에 대한 한국어 번역
  const koreanMent: KoreanMentType = {
    "heart": "마음 표현",
    "about": "백과사전 작성 횟수",
    "hello": "채팅 횟수",
    "calendar": "일정 잡기"
  }
  return (
    <div className="mission__index">
      <div className="improvement-oneline">
        <div className="flex-row">


          <div className="improvement-comment">
            <span className="text-orange">{familyName}는</span>
            {improvement.map((item, i) => (
              <React.Fragment key={i}>
                {i > 0 && ", "}
                {koreanMent[item]}
              </React.Fragment>
            ))}
            {"가 부족해요"}
          </div>
        </div>

      </div>
      <Slider {...settings}>
        {improvement.map((item, i) => (<Improvement type={item} key={i}/>))}

      </Slider>
      <h2 className="mission__item-title">미션 리스트</h2>
      {missions.map((mission, index) => {
        return <MissionItem key={index} mission={mission}/>
      })}
    </div>
  );
}

export default MissionIndex;