import {initializeApp} from "firebase/app";
import {getMessaging, getToken} from "firebase/messaging";
import {getPushAlarmByLocalStorage} from "@api/FirebaseAxios";
import {firebaseConfig,VALID_KEY} from "./config";


const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);
export async function requestPermission() {

  console.log("FCM 알림 권한 요청 시작");
  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    alert("FCM 알림 권한 얻기 실패");
    return;
  } else {
    alert("FCM 알림 권한 허용");
  }

  // 사용자 디바이스 토큰 얻기
  const token = await getToken(messaging, {
    vapidKey: VALID_KEY,
  });

  // 토큰 조회한 뒤, 서버로 토큰 구독
  if (token) {
    alert(`FCM device token: ${token}`);
    // 스토어에 저장
    localStorage.setItem('fcmDeviceToken', token);
    // 서버로 토큰 구독하기
    getPushAlarmByLocalStorage()
    try {
      console.log("FCM device token 업데이트 api 요청");
    } catch (error) {
      console.error("FCM device token 업데이트 api 실패" + error);
    }
  } else {
    alert("FCM device token을 얻지 못함");
  }

}
