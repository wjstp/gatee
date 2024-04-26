import React from 'react';
import { Routes, Route } from "react-router-dom";
import MainLayout from "@layout/MainLayout";
import SubLayout from "@layout/SubLayout";
import ExamIndex from "@pages/exam";
import ExamGrade from "@pages/exam/Grade";
import ExamScored from "@pages/exam/Scored";
import ExamTaking from "@pages/exam/Taking";
import MainIndex from "@pages/main";
import MissionIndex from "@pages/mission";
import NotificationIndex from "@pages/notification";
import OnboardingIndex from "@pages/onboarding/index";
import KaKaoLogin from "@pages/onboarding/component/KaKaoLogin";
import ProfileIndex from "@pages/profile";
import ScheduleIndex from "@pages/schedule";
import ScheduleCreateSchedule from "@pages/schedule/CreateSchedule";
import ScheduleCreateReview from "@pages/schedule/CreateReview";
import ScheduleDetail from "@pages/schedule/ScheduleDetail";
import ChatIndex from "@pages/chat";
import CharacterIndex from "@pages/character";
import CharacterStart from "@pages/character/Start";
import CharacterQuestion from "@pages/character/Question";
import SignupIndex from "@pages/signup";
import SignupMember from "@pages/signup/Member";
import SignupFamily from "@pages/signup/Family";
import PhotoAlbumIndex from "@pages/photo";
import PhotoAlbumGroupDetail from "@pages/photo/AlbumGroupDetail";
import PhotoAllGroupDetail from "@pages/photo/AllGroupDetail";
import PhotoAlbumPhoto from "@pages/photo/AlbumPhoto";

const Router = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        {/*모의고사 페이지*/}
        <Route path="/exam" element={<ExamIndex/>}/>
        <Route path="/exam/grade" element={<ExamGrade/>}/>
        <Route path="/exam/scored/:id" element={<ExamScored/>}/>
        <Route path="/exam/taking" element={<ExamTaking/>}/>

        {/*채팅 페이지*/}
        <Route path="/chat" element={<ChatIndex/>}/>

        {/*알림 페이지*/}
        <Route path="/notification" element={<NotificationIndex/>}/>

        {/*프로필 페이지*/}
        <Route path="/profile" element={<ProfileIndex/>}/>

        {/*메인 페이지*/}
        <Route path="/main" element={<MainIndex/>}/>
        <Route path="/main/mission" element={<MissionIndex/>}/>

        {/*스케줄 페이지*/}
        <Route path="/schedule" element={<ScheduleIndex/>}/>
        <Route path="/schedule/create-schedule" element={<ScheduleCreateSchedule/>}/>
        <Route path="/schedule/create-review" element={<ScheduleCreateReview/>}/>
        <Route path="/schedule/:id" element={<ScheduleDetail/>}/>

        {/*백과사전 페이지*/}
        <Route path="/character" element={<CharacterIndex/>}/>
        <Route path="/character/start" element={<CharacterStart/>}/>
        <Route path="/character/question" element={<CharacterQuestion/>}/>

        {/*앨범 페이지*/}
        <Route path="/photo" element={<PhotoAlbumIndex/>}/>
        <Route path="/photo/album" element={<PhotoAlbumPhoto/>}/>
        <Route path="/photo/group/:id" element={<PhotoAllGroupDetail/>}/>
        <Route path="/photo/album/:id" element={<PhotoAlbumGroupDetail/>}/>
      </Route>

      {/*TabBar, BottomBar 없는 레이아웃*/}
      <Route element={<SubLayout/>}>
        {/*온보딩 페이지*/}
        <Route path="/" element={<OnboardingIndex/>}/>
        <Route path="/kakao" element={<KaKaoLogin/>}/>

        {/*회원가입 페이지*/}
        <Route path="/signup" element={<SignupIndex/>}/>
        <Route path="/signup/member" element={<SignupMember/>}/>
        <Route path="/signup/family" element={<SignupFamily/>}/>
      </Route>

      {/*404 처리*/}
      {/*<Route component={NotFount} />*/}
    </Routes>
  );
}

export default Router;