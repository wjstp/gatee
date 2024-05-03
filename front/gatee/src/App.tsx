import React from 'react';
import Router from "./Router";
import  "./firebaseInit.ts";
import {requestPermission} from "./firebaseInit";

const App = ()=> {
  requestPermission()
  // 로컬 스토리지 초기화
  // localStorage.removeItem("family");
  // localStorage.removeItem("member")
  // localStorage.removeItem("photo")
  // localStorage.removeItem("modal")

  return (
    <div>
      <Router/>
    </div>
  );
}

export default App;
