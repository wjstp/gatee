import React, {useEffect} from 'react';
import MissionItem from "@pages/mission/components/MissionItem";
import Slider from "react-slick";
import Improvement from "@pages/mission/components/Improvement";
import {useFamilyStore} from "@store/useFamilyStore";
import {getMissionApi} from "@api/mission";
import {useMissionStore} from "@store/useMissionStore";
import {useMemberStore} from "@store/useMemberStore";

interface KoreanMentType {
  [key: string]: string;
}

const MissionIndex = () => {
  const {familyId} = useFamilyStore()
  const {missionList, setMissionList} = useMissionStore()
  // 미션 저장 api
  const getMissionApiFunc = () => {
    getMissionApi({familyId:familyId},
      res => {
        console.log(res)
        setMissionList(res.data.missionListResList)
      },
      err => {
        console.log(err)
      }
    )
  }

  // 제출한 뒤에, 미션 get api 재실행
  const handleSubmitMission = () => {
    getMissionApiFunc()
  }

  // 미션 api 받기
  useEffect(() => {
    getMissionApiFunc()
  }, []);


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
    autoplay:false,
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


  const {myInfo} = useMemberStore()
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
            <span className="text-orange">{myInfo.nickname} </span>
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
      {missionList.map((mission, index) => {
        return <MissionItem key={index} mission={mission} handleSubmitMission={handleSubmitMission}/>
      })}
    </div>
  );
}

export default MissionIndex;