// v9
// import {initializeApp} from "firebase/app";
// import {getMessaging, getToken,isSupported} from "firebase/messaging";
// import {getPushAlarmByLocalStorageApi} from "@api/FirebaseAxios";
// import {firebaseConfig,VALID_KEY} from "./config";
//
// let messaging
// if (isSupported()) {
//   // messaging = getMessaging(app)
// }

// v8

// import firebase from 'firebase/app';
import 'firebase/messaging';
import { getPushAlarmByLocalStorageApi } from "@api/firebase";
import firebase from "./firebase-config";

const VALID_KEY = process.env.REACT_APP_FCM_VAPID_KEY;

let messaging;

// 브라우저 문제로 오류나서 추가한 것
if (firebase.messaging.isSupported()) {
  messaging = firebase.messaging();
}

export async function requestPermission() {
  if (firebase.messaging.isSupported()) {
    const permission = await Notification.requestPermission();
    if (permission === "denied") {
      console.log("FCM 알림 권한이 거부되었습니다. 앱 설정 -> 가티 -> 알림 허용해 주세요.");
      return;
    } else {
      console.log("FCM 알림 권한 허용");
    }

    // 사용자 디바이스 토큰 얻기
    // //v9
    // const token = await getToken(messaging, {
    //   vapidKey: VALID_KEY,
    // });

    // v8
    const token = await messaging.getToken({
      vapidKey: VALID_KEY,
    });

    // 토큰 조회한 뒤, 서버로 토큰 구독
    if (token) {
      alert(token)
      console.log(token)
      // 스토어에 저장
      localStorage.setItem('fcmDeviceToken', token);
      // 서버로 토큰 구독하기
      getPushAlarmByLocalStorageApi()
      // try {
      //   console.log("FCM device token 업데이트 api 요청");
      // } catch (error) {
      //   console.error("FCM device token 업데이트 api 실패" + error);
      // }
    } else {
      console.log("FCM device token을 얻지 못함");
    }
  } else {
    console.log("지원되지 않는 브라우저")
  }
}

// // 메세지 받는 함수 v9
// onMessage(messaging, (payload) => {
//   console.log(`Message received. ${payload}`);
//   // ...
// });

// // 메세지 받는 함수 v8

let url = "/main"

if (firebase.messaging.isSupported())
  messaging.onMessage((payload) => {
    console.log(payload.notification)
    const notificationData = payload.notification
    const notificationTitle = payload.notification.title;
    if (notificationTitle.includes("채팅")) {
      url = "/chatting"
    } else if (notificationTitle.includes("사진")) {
      url = "/photo/day"
    } else if (notificationTitle.includes("한마디")) {
      url = "/notification"
    }

    const notificationOptions = {
      body: notificationData.body,
      icon: notificationData.icon,
    };
    if (window.location.href.includes("chatting") && notificationTitle.includes("채팅")) return
    else {
      showNotification(notificationTitle, notificationOptions, url);
    }
  });


// 알림 표시
const showNotification = (notificationTitle, notificationOptions,url) => {
  // 알림 생성
  const notification = new Notification(notificationTitle, notificationOptions);

  // 알림 클릭 이벤트 리스너 추가
  notification.addEventListener('click', function() {
    // 클릭 시 동작할 코드 작성
    console.log('알림이 클릭되었습니다.');
    // 예시: 원하는 URL로 이동
    window.location.href = url;
  });
}
