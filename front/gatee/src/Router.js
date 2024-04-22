import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExamIndex from "./pages/exam";
import MainIndex from "./pages/main";
import NotificationIndex from "./pages/notification";
import OnboardingIndex from "./pages/onboarding";
import ProfileIndex from "./pages/profile";
import ScheduleIndex from "./pages/schedule";
import ChatIndex from "./pages/chat";
import CharacterIndex from "./pages/character";
import SignupIndex from "./pages/signup";
import TopBar from './components/TopBar';
import BottomBar from "./components/BottomBar";
import AlbumIndex from "./pages/photo";
const Router = () => {
  return (
      <BrowserRouter>
        <TopBar/>
        <Routes>
            <Route path="/" element={<SignupIndex />} />
            <Route path="/exam" element={<ExamIndex />} />
            <Route path="/chat" element={<ChatIndex />} />
            <Route path="/notification" element={<NotificationIndex />} />
            <Route path="/profile" element={<ProfileIndex />} />
            <Route path="/main" element={<MainIndex />} />
            <Route path="/onboarding" element={<OnboardingIndex />} />
            <Route path="/schedule" element={<ScheduleIndex />} />
            <Route path="/character" element={<CharacterIndex />} />
            <Route path="/album" element={<AlbumIndex />} />
        </Routes>
        <BottomBar style={{position: "fixed",bottom: 0, left: 0, right: 0}}/>
      </BrowserRouter>
  );
}

export default Router;
