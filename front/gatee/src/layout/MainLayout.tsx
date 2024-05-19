import React, {useEffect} from "react";
import TopBar from '@components/TopBar';
import BottomBar from "@components/BottomBar";
import {Outlet} from 'react-router-dom'
import {Helmet, HelmetProvider} from 'react-helmet-async';
import {useModalStore} from "@store/useModalStore";
import {useMemberStore} from "@store/useMemberStore";
import {useFamilyStore} from "@store/useFamilyStore";
import {useChatStore} from "@store/useChatStore";
import {getFamilyMemberApi, getMyDataApi} from "@api/member";
import firebase from "../firebase-config";
import 'firebase/database';
import NotificationPopUp from "@components/NotificationPopup";
import {requestPermission} from "../firebase-messaging-sw";
import {getPushAlarmByLocalStorageApi} from "@api/firebase";

const MainLayout = () => {
  const {showModal} = useModalStore();
  const {setMyInfo, myInfo} = useMemberStore();
  const {
    familyId,
    familyInfo,
    setFamilyId,
    setFamilyInfo,
    setFamilyName,
    setFamilyScore,
    setChatRoomId
  } = useFamilyStore();
  const {isShowBottomBar, setIsNewMessage} = useChatStore();
  const chatRef = firebase.database().ref(`chat/${familyId}/messages`);
  // const {showNotification} = useNotificationStore()

  // 가족 데이터 저장 Api
  const saveFamilyData = (familyId: string) => {
    getFamilyMemberApi(
      {familyId: familyId},
      (res) => {
        console.log("가족 정보 조회", res.data);
        setFamilyInfo(res.data.memberFamilyInfoList);
        setFamilyName(res.data.name);
        setFamilyScore(res.data.familyScore);
        setChatRoomId(res.data.chatRoomId);
      },
      (err) => {
        console.error(err);
      }
    ).then().catch()
  }

  // 정보 불러오기 Api
  const saveMemberData = () => {
    getMyDataApi(
      (res) => {
        console.log("내 정보 조회", res.data);
        // 스토어에 저장
        setMyInfo(res.data);
        setFamilyId(res.data.familyId);
        // 가족 데이터 저장 Api
        saveFamilyData(res.data.familyId);
      },
      (err) => {
        console.error(err);
      }
    ).then().catch()
  }

  useEffect(() => {
    // 스토어가 비어있을 때만
    if (familyInfo.length === 0) {
      saveMemberData();
    }
    // fcm 토큰 전송 - 로컬 스토리지에 있을때는 그거 보내고, 없으면 권한 묻고 다시 보냄
    if (localStorage.getItem("fcmDeviceToken")) {
      getPushAlarmByLocalStorageApi()
    } else {
      requestPermission()
    }

  }, []);

  useEffect(() => {
    // Firebase 실시간 이벤트 리스너 등록
    chatRef.limitToLast(1).on('value', handleNewMessage);
  }, [familyId]);

  // 수신한 새로운 메시지가 읽지 않은 것인지 확인
  const handleNewMessage = (snapshot: firebase.database.DataSnapshot) => {
    const messageData = snapshot.val();
    snapshot.forEach((childSnapshot) => {
      const childData = childSnapshot.val();

      if ("unReadMember" in childData) {
        const unReadMember: string[] = childData.unReadMember;
        setIsNewMessage(unReadMember.includes(myInfo.memberId));
      }
    });
  }

  return (
    <>
      {/*알림*/}
      <NotificationPopUp/>
      {/* 모달이 띄워진 상태라면 상단바를 회색으로 만듦 */}
      {
        showModal ?
          (
            <HelmetProvider>
              <Helmet>
                <meta name="theme-color" id="theme-color" content="#808080"/>
              </Helmet>
            </HelmetProvider>
          )
          :
          (
            <HelmetProvider>
              <Helmet>
                <meta name="theme-color" id="theme-color" content="#FEFEFE"/>
              </Helmet>
            </HelmetProvider>
          )
      }

      <TopBar></TopBar>
      <div id={isShowBottomBar ? "main" : "main-focus"}>
        <Outlet/>
      </div>
      {isShowBottomBar && <BottomBar></BottomBar>}
    </>
  )
}

export default MainLayout