import React, {useEffect} from 'react';
import Router from "./Router";
import {requestPermission} from "./firebase-messaging-sw";
import {useMemberStore} from "@store/useMemberStore";

const App = ()=> {
  const {accessToken} = useMemberStore()
  // useEffect(() => {
  //   requestPermission(accessToken)
  // }, []);
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
