import React from 'react';
import { Routes, Route } from "react-router-dom";
import MainLayout from "@layout/MainLayout";  // 레이아웃
import SubLayout from "@layout/SubLayout";
import ExamIndex from "@pages/exam";  // 모의고사
import ExamGrade from "@pages/exam/Grade";
import ExamScored from "@pages/exam/Scored";
import ExamTaking from "@pages/exam/Taking";
import MainIndex from "@pages/main";  // 메인
import MissionIndex from "@pages/mission";  // 미션
import NotificationIndex from "@pages/notification";  // 알림
import OnboardingIndex from "@pages/onboarding/index";  // 온보딩
import KaKaoLogin from "@pages/onboarding/component/KaKaoLogin";
import ProfileIndex from "@pages/profile";  // 프로필
import ScheduleIndex from "@pages/schedule";  // 일정
import ScheduleCreateSchedule from "@pages/schedule/CreateSchedule";
import ScheduleCreateReview from "@pages/schedule/CreateReview";
import ScheduleDetail from "@pages/schedule/ScheduleDetail";
import ChatIndex from "@pages/chat";  // 채팅
import CharacterIndex from "@pages/character";  // 백과사전
import CharacterStart from "@pages/character/AnswerList";
import CharacterQuestion from "@pages/character/Question";
import SignupIndex from "@pages/signup";  // 회원가입
import SignupMember from "@pages/signup/Member";
import SignupFamily from "@pages/signup/Family";
import PhotoAlbumIndex from "@pages/photo"; // 앨범
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

        {/*미션 페이지*/}
        <Route path="/mission" element={<MissionIndex/>}/>

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
          <Route path="album" element={<PhotoAlbumPhoto/>}/>
          <Route path="/album/:id" element={<PhotoAlbumGroupDetail/>}/>
          <Route path="/group/:id" element={<PhotoAllGroupDetail/>}/>

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
