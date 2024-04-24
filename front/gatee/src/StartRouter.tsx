// 온보딩
import OnboardingIndex from "./pages/onboarding/index";
import KaKaoLogin from "./pages/onboarding/component/KaKaoLogin";
// 회원가입
import SignupIndex from "./pages/signup";
import SignupMember from "./pages/signup/Member";
import SignupFamily from "./pages/signup/Family";
import {BrowserRouter, Route, Routes} from "react-router-dom";
const StartRouter = () => {
  return (
      <BrowserRouter>
        {/*<TopBar/>*/}
          <div className="container">
              <Routes>
                  {/*온보딩*/}
                  <Route path="/" element={<OnboardingIndex />} />
                  <Route path="/kakao" element={<KaKaoLogin />} />
                  {/*회원가입*/}
                  <Route path="/signup" element={<SignupIndex />} />
                  <Route path="/signup/member" element={<SignupMember />} />
                  <Route path="/signup/family" element={<SignupFamily />} />
              </Routes>
          </div>
        {/*<BottomBar />*/}
      </BrowserRouter>
  );
}

export default StartRouter;
