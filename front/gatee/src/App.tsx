import React from 'react';
import Router from "./Router";

const App = ()=> {
  // 로컬 스토리지 밀기
  // localStorage.removeItem("family");
  // localStorage.removeItem("member")
  // localStorage.removeItem("photo")
  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;
