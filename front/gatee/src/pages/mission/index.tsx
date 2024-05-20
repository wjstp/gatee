import React, {useEffect, useState} from 'react';
import MissionItem from "@pages/mission/components/MissionItem";
import Slider from "react-slick";
import Improvement from "@pages/mission/components/Improvement";
import {useFamilyStore} from "@store/useFamilyStore";
import {getMissionApi} from "@api/mission";
import {useMissionStore} from "@store/useMissionStore";
import {useMemberStore} from "@store/useMemberStore";
import Loading from "@components/Loading";

interface KoreanMentType {
  [key: string]: string;
}

const MissionIndex = () => {
  const {familyId} = useFamilyStore()
  const {missionList, setMissionList} = useMissionStore()
  const [loading, setLoading] = useState(true)
  const {myInfo} = useMemberStore()
  // 우리 가족의 개선사항
  const [improvement, setImprovement] = useState([
    "heart",
    "hello",
  ])
  // const [sli]

  // 개선사항에 대한 한국어 번역
  const koreanMent: KoreanMentType = {
    "heart": "마음 표현",
    "featureMission": "백과사전 작성",
    "albumMission": "사진 업로드",
    "examMission": "모의고사 응시",
    "hello": "채팅 횟수",
    "scheduleMission": "일정 잡기"
  }

  // 미션 저장 api
  const getMissionApiFunc = () => {
    getMissionApi({familyId: familyId},
      res => {
        console.log(res)
        setMissionList(res.data.missionListResList)
        const data = Object.keys(res.data.missionImprovementsRes).filter(key => res.data.missionImprovementsRes[key]);
        setImprovement(["heart", "hello", ...data])
        setLoading(false)
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
    autoplay: false,
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


  return (
    <div className="mission__index">
      {loading ? <Loading/> :null }
        <div className="improvement-oneline">
          <div className="flex-row">


            <div className="improvement-comment">
              {improvement.length <= 2 ? null : <>
                <span className="text-orange">{myInfo.nickname} </span>
                {improvement.map((item, i) => {
                    if (item === "heart" || item === "hello") return null
                    else return (<React.Fragment key={i}>
                        {i > 2 && ", "} {koreanMent[item]}

                      </React.Fragment>
                    )
                  }
                )}
                <span> 이/가 부족해요</span>
              </>
              }
            </div>
          </div>

        </div>
        <Slider {...settings}>
      {improvement.map((item, i) => (<Improvement type={item} key={i}/>))}

    </Slider>
  <h2 className="mission__item-title">미션 리스트</h2>
  {
    missionList.map((mission, index) => {
      return <MissionItem key={index} mission={mission} handleSubmitMission={handleSubmitMission}/>
    })
  }

</div>

)
  ;
}

export default MissionIndex;