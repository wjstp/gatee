
self.addEventListener("install", function (e) {
  console.log("FCM Service Worker install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("FCM Service Worker activate..");
});
//
// // 푸시 알림 받는 설정
// self.addEventListener("push", function (e) {
//   console.log("push: ", e.data.json());
//   if (!e.data.json()) return;
//
//   const resultData = e.data.json().notification;
//   const notificationTitle = resultData.title;
//   const notificationOptions = {
//     body: resultData.body,
//     icon: resultData.image,
//     tag: resultData.tag,
//     ...resultData,
//   };
//   console.log("push: ", { resultData, notificationTitle, notificationOptions });
//
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
//
// self.addEventListener("notificationclick", function (event) {
//   console.log("Notification clicked");
//   const clickedNotification = event.notification;
//   clickedNotification.close();
//
//   const pushPath = '/main';
//   console.log("알림 클릭 시, 페이지 이동 : " + pushPath);
//
//   // 클라이언트 측에서 해당 경로로 이동
//   event.waitUntil(
//     self.clients.openWindow(pushPath)
//   );
// });
//
//
//
// importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js');
// importScripts('https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js');
// //
// // // console.log("public 여기 있다")
// //
// firebase.initializeApp({
//   apiKey: "AIzaSyCiiaCQgXFvOYDt5jzzRIHwnhC_kCJ5op8",
//   authDomain: "gatee-bf33f.firebaseapp.com",
//   projectId: "gatee-bf33f",
//   storageBucket: "gatee-bf33f.appspot.com",
//   messagingSenderId: "1009013790999",
//   appId: "1:1009013790999:web:e4273021380c2598cd7f52",
//   measurementId: "G-5T6L10CXW3"
// });
// //
// //
// const messaging = firebase.messaging();
//
// messaging.onBackgroundMessage(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/app_icon.png'
//   };
//
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
//
// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
//   // ...
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/app_icon.png'
//   };
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

