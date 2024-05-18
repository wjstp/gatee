self.addEventListener('install', function (e) {
  console.log('fcm sw install..');
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  console.log('fcm sw activate..');
});


importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.3.1/firebase-messaging.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCiiaCQgXFvOYDt5jzzRIHwnhC_kCJ5op8',
  authDomain: 'gatee-bf33f.firebaseapp.com',
  projectId: 'gatee-bf33f',
  storageBucket: 'gatee-bf33f.appspot.com',
  messagingSenderId: '1009013790999',
  appId: '1:1009013790999:web:e4273021380c2598cd7f52',
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BHM_6_Y5fpMq6wpVagokLqSOdbPAwoNXW5eUO2DNw3lV_bGMgrr9f7BnymfevaF_TaJMpwummAey77-wsO-0VsE');


messaging.onBackgroundMessage((payload) => {
  console.log(
    '백그라운드 알림',
    payload.notification
  );
  // Customize notification here
  const notificationData = payload.notification
  const notificationTitle = payload.notification.title;


  const notificationOptions = {
    body: notificationData.body,
    icon: notificationData.image,
  };


  self.registration.showNotification(notificationTitle, notificationOptions);
});


self.addEventListener('notificationclick', function (event) {
  const url = "/main"
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});


// 전역 알림 받기 설정
// self.addEventListener('push', function (e) {
//   console.log(e.data.json().notification.title)
// const notificationData=e.data.json().notification
//   const notificationTitle = e.data.json().notification.title;
//   if (notificationTitle.includes("채팅")) {
//     url = "/chatting"
//   } else if (notificationTitle.includes("사진")) {
//     url = "/photo/day"
//   } else if (notificationTitle.includes("한마디")) {
//     url = "/notification"
//   }
//const notificationOptions = {
//     body: notificationData.body,
//     icon: notificationData.icon,
//   };
//    self.registration.showNotification(notificationTitle, notificationOptions);
// });

