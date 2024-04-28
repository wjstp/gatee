import React from 'react';
import { Routes, Route } from "react-router-dom";
// 레이아웃
import MainLayout from "./layout/MainLayout";
import SubLayout from "./layout/SubLayout";
// 모의고사
import ExamIndex from "./pages/exam";
import ExamGrade from "./pages/exam/Grade";
import ExamScored from "./pages/exam/Scored";
import ExamTaking from "./pages/exam/Taking";
// 메인
import MainIndex from "./pages/main";
import MissionIndex from "./pages/mission";
// 알림
import NotificationIndex from "./pages/notification";
// 온보딩
import OnboardingIndex from "./pages/onboarding/index";
import KaKaoLogin from "./pages/onboarding/component/KaKaoLogin";
// 프로필
import ProfileIndex from "./pages/profile";
// 일정
import ScheduleIndex from "./pages/schedule";
import ScheduleCreateSchedule from "./pages/schedule/CreateSchedule";
import ScheduleCreateReview from "./pages/schedule/CreateReview";
import ScheduleDetail from "./pages/schedule/ScheduleDetail";
// 채팅
import ChatIndex from "./pages/chat";
// 백과사전
import CharacterIndex from "./pages/character";
import CharacterStart from "./pages/character/Start";
import CharacterQuestion from "./pages/character/Question";
// 회원가입
import SignupIndex from "@pages/signup";
import MemberSetBirth from "@pages/signup/MemberSetBirth";
import MemberSetCheck from "@pages/signup/MemberSetCheck";
import MemberSetFinish from "@pages/signup/MemberSetFinish";
import MemberSetRole from "@pages/signup/MemberSetRole";
import MemberSetPermission from "@pages/signup/MemberSetPermission";
import MemberSet from "@pages/signup/MemberSet";
import FamilySetShare from "@pages/signup/FamilySetShare";
import FamilySetCheck from "@pages/signup/FamilySetCheck";
import FamilySet from "@pages/signup/FamilySet";
import FamilyJoin from "@pages/signup/FamilyJoin";
import FamilyJoinCheck from "@pages/signup/FamilyJoinCheck";
// 앨범
import PhotoAlbumIndex from "./pages/photo";
import PhotoAlbumGroupDetail from "./pages/photo/AlbumGroupDetail";
import PhotoAllGroupDetail from "./pages/photo/AllGroupDetail";
import PhotoAlbumPhoto from "./pages/photo/AlbumPhoto";
import SignupFamily from "@pages/signup/Family";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        {/*모의고사*/}
        <Route path="/exam" element={<ExamIndex/>}/>
        <Route path="/exam/grade" element={<ExamGrade/>}/>
        <Route path="/exam/scored/:id" element={<ExamScored/>}/>
        <Route path="/exam/taking" element={<ExamTaking/>}/>
        {/*채팅*/}
        <Route path="/chat" element={<ChatIndex/>}/>
        {/*알람*/}
        <Route path="/notification" element={<NotificationIndex/>}/>
        {/*프로필*/}
        <Route path="/profile" element={<ProfileIndex/>}/>
        {/*메인*/}
        <Route path="/main" element={<MainIndex/>}/>
        <Route path="/main/mission" element={<MissionIndex/>}/>
        {/*스케줄*/}
        <Route path="/schedule" element={<ScheduleIndex/>}/>
        <Route path="/schedule/create-schedule" element={<ScheduleCreateSchedule/>}/>
        <Route path="/schedule/create-review" element={<ScheduleCreateReview/>}/>
        <Route path="/schedule/:id" element={<ScheduleDetail/>}/>
        {/*백과사전*/}
        <Route path="/character" element={<CharacterIndex/>}/>
        <Route path="/character/start" element={<CharacterStart/>}/>
        <Route path="/character/question" element={<CharacterQuestion/>}/>
        {/*앨범*/}
        <Route path="/photo" element={<PhotoAlbumIndex/>}/>
        <Route path="/photo/album" element={<PhotoAlbumPhoto/>}/>
        <Route path="/photo/group/:id" element={<PhotoAllGroupDetail/>}/>
        <Route path="/photo/album/:id" element={<PhotoAlbumGroupDetail/>}/>
      </Route>
      <Route element={<SubLayout/>}>
        {/*온보딩*/}
        <Route path="/" element={<OnboardingIndex/>}/>
        <Route path="/kakao" element={<KaKaoLogin/>}/>
        {/*회원가입*/}
        <Route path="/signup" element={<SignupIndex/>}/>
        <Route path="/signup/family-set" element={<FamilySet/>}/>
        <Route path="/signup/family-set/check" element={<FamilySetCheck/>}/>
        <Route path="/signup/family-set/share" element={<FamilySetShare/>}/>
        <Route path="/signup/family-join" element={<FamilyJoin/>}/>
        <Route path="/signup/family-join/check" element={<FamilyJoinCheck/>}/>
        <Route path="/signup/member-set" element={<MemberSet/>}/>
        <Route path="/signup/member-set/birth" element={<MemberSetBirth/>}/>
        <Route path="/signup/member-set/role" element={<MemberSetRole/>}/>
        <Route path="/signup/member-set/check" element={<MemberSetCheck/>}/>
        <Route path="/signup/member-set/permission" element={<MemberSetPermission/>}/>
        <Route path="/signup/member-set/finish" element={<MemberSetFinish/>}/>

        <Route path="/signup/family" element={<SignupFamily/>}/>
        <Route path="/signup/family" element={<SignupFamily/>}/>
      </Route>
    </Routes>
  );
}

export default Router;
