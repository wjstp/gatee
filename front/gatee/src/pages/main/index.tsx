import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as House} from "@assets/images/main/main_home.svg";
import HeartAnimation from "@assets/images/animation/heart_animation.json"
import Lottie from "lottie-react";
import {FamilyPoint} from "@pages/main/components/FamilyPoint";
import ProfileList from "@pages/main/components/ProfileList";
import {getFamilyMemberApi, getMyDataApi} from "@api/member";
import {useMemberStore} from "@store/useMemberStore";
import {useFamilyStore} from "@store/useFamilyStore";
import Loading from "@components/Loading";
import { FiBook } from "react-icons/fi";
import {getMissionApi} from "@api/mission";
import {useMissionStore} from "@store/useMissionStore";
const MainIndex = () => {
  // const {setMyInfo} = useMemberStore()
  const { setMyInfo} = useMemberStore()
  const {
    familyInfo,
    familyId,
    setFamilyId,
    setFamilyInfo,
    setFamilyName,
    setFamilyScore,
    setFamilyImage,
    setStringImage,
    setInputStringImage,
  } = useFamilyStore()
  const [loading, setLoading] = useState(true)
  const { setMissionList} = useMissionStore()
  // 가족 데이터 저장 Api
  const saveFamilyData = (familyId:string) => {
    getFamilyMemberApi({familyId:familyId},
      (res) => {
        console.log("가족 정보 조회",res.data);
        setFamilyInfo(res.data.memberFamilyInfoList);
        setFamilyName(res.data.name);
        setFamilyScore(res.data.familyScore);
        setStringImage(res.data.familyImageUrl);
        setInputStringImage(res.data.familyImageUrl);
      },
      (err) => {
        console.log(err);
      }
    );
  }

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
  // 정보 불러오기 Api
  const saveMemberData = () => {
    getMyDataApi(
      (res) => {
        console.log("내 정보 조회",res.data)
        // 스토어에 저장
        setMyInfo(res.data)
        setFamilyId(res.data.familyId)
        // 가족 데이터 저장 Api
        saveFamilyData(res.data.familyId)
      },
      (err) => {
        console.log(err);
      }
    );
  }

  useEffect(() => {
    saveMemberData()
    getMissionApiFunc()
    setTimeout(()=>
      setLoading(false)
    ,700)
  }, []);

  return (
    <div className="main-container">
      {loading? <Loading/> : null}
        {/* 가족 온도 */}
        <FamilyPoint/>

        {/* 프로필 리스트 */}
        <ProfileList profileDataList={familyInfo}/>

        {/* 미션 탭으로 가기 */}
        <Link to="/character/start" className="go-to-mission__button-event">
          <FiBook size={35}/>
          <p>사전</p>
        </Link>

        <Lottie className="main-heart-animation" animationData={HeartAnimation}/>
        <House className="main-house-img"/>
    </div>
  );
}


export default MainIndex;