import React, {useEffect} from 'react';
import Router from "./Router";
import {firebaseConfig, VALID_KEY} from "./config";

const App = ()=> {
  useEffect(() => {
    console.log("env 파일 확인",firebaseConfig,VALID_KEY)
  }, []);
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
