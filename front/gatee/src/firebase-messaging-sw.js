import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";
import {GetPushAlarmByLocalStorage} from "@api/FirebaseAxios";

// 파이어 베이스 객체 생성
const app = initializeApp({
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
});


const messaging = getMessaging(app);

// 푸시 알림 받는 설정
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  console.log("push: ", {resultData, notificationTitle, notificationOptions});
  /* eslint-disable-next-line no-restricted-globals */
  self.registration.showNotification(notificationTitle, notificationOptions);
});



export async function requestPermission(accessToken) {

  // console.log("FCM 알림 권한 요청 시작");
  const permission = await Notification.requestPermission();

  if (permission === "denied") {
    // console.log("FCM 알림 권한 얻기 실패");
    return;
  } else {
    // console.log("FCM 알림 권한 허용");
  }

  // 사용자 디바이스 토큰 얻기
  const token = await getToken(messaging, {
    vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
  });

  // 토큰 조회한 뒤, 서버로 토큰 구독
  if (token) {
    // console.log("FCM device token: ", token);
    // 스토어에 저장
    localStorage.setItem('fcmDeviceToken', token);
    // console.log("localStorage.getItem FCM device token: " + localStorage.getItem('fcmDeviceToken'));
    // 서버로 토큰 구독하기
    GetPushAlarmByLocalStorage(accessToken)
    try {
      // console.log("FCM device token 업데이트 api 요청");

    } catch (error) {
      console.error("FCM device token 업데이트 api 실패" + error);
    }
  } else {
    console.log("FCM device token을 얻지 못함");
  }
}
