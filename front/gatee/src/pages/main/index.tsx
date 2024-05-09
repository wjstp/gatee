import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {ReactComponent as House} from "@assets/images/main/main_home.svg";
import HeartAnimation from "@assets/images/animation/heart_animation.json"
import Lottie from "lottie-react";
import { PiTarget } from "react-icons/pi";
import {FamilyPoint} from "@pages/main/components/FamilyPoint";
import ProfileList from "@pages/main/components/ProfileList";
import {FamilyMemberInfoSample} from "@constants/index";
import {getMyDataApi} from "@api/member";
import {useMemberStore} from "@store/useMemberStore";
import {useFamilyStore} from "@store/useFamilyStore";


const MainIndex = () => {
  const {name,setName,setBirthDay,setBirthType,setMemberId,setMood,setNickName,setRole} = useMemberStore()
  const {setFamilyId} = useFamilyStore()
  useEffect(() => {
    // getMyDataApi(res => {
    //   setBirthDay(res.data.birth)
    //   setBirthType(res.data.birthType)
    //   setFamilyId(res.data.familyId)
    //   setMemberId(res.data.memberId)
    //   setMood(res.data.mood)
    //   setName(res.data.name)
    //   setNickName(res.data.nickname)
    //   setRole(res.data.role)
    //   console.log(res.data)
    // },err => {
    //   console.log(err)
    // })
  }, []);
console.log(name)
  return (
    <div className="main-container">

      {/* 가족 온도 */}
      <FamilyPoint/>

      {/* 프로필 리스트 */}
      <ProfileList profileDataList={FamilyMemberInfoSample}/>

      {/* 미션 탭으로 가기 */}
      <Link to="/main/mission" className="go-to-mission__button-event">
        <PiTarget size={35}/>
        <p>미션</p>
      </Link>

      <Lottie className="main-heart-animation" animationData={HeartAnimation}/>
      <House className="main-house-img"/>

    </div>
  );
}


export default MainIndex;