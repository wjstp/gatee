import firebase from 'firebase/app'
import 'firebase/messaging'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FCM_API_KEY,
  authDomain: process.env.REACT_APP_FCM_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FCM_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FCM_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FCM_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FCM_APP_ID,
  measurementId: process.env.REACT_APP_FCM_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig)

const fcmMessaging = firebase.messaging()

export function requestPermission() {
  void Notification.requestPermission().then((permission) => {
    console.log(permission)
    if (permission === 'granted') {
      console.log("알림 권한 허용됨")
      fcmMessaging
        .getToken({ vapidKey: process.env.REACT_APP_FCM_VAPID_KEY })
        .then((token: string) => {
          console.log(`푸시 토큰 발급 완료 : ${token}`)
        })
        .catch((err) => {
          console.log('푸시 토큰 가져오는 중에 에러 발생')
        })
    } else if (permission === 'denied') {
      console.log('푸시 권한 차단')
    }
  })
}


// fcmMessaging.onMessage((payload) => {
//   console.log(payload?.notification?.title)
//   console.log(payload?.notification?.body)
// })