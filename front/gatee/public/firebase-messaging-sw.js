
self.addEventListener("install", function (e) {
  console.log("FCM Service Worker install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("FCM Service Worker activate..");
});

// 푸시 알림 받는 설정
self.addEventListener("push", function (e) {
  console.log("푸시 e: ", e);
  console.log("푸시 e.data.json(): ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
    ...resultData,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification clicked");
  console.log("event",event)
  const clickedNotification = event.notification;
  console.log("event.notification",event.notification)
  console.log("event.notification.data.url",event.notification.data.url)
  clickedNotification.close();

  const pushPath = '/main';
  console.log("알림 클릭 시, 페이지 이동 : " + pushPath);

  // 클라이언트 측에서 해당 경로로 이동
  event.waitUntil(
    self.clients.openWindow(pushPath)
  );
});



// // 백그라운드 메세지
// messaging.onBackgroundMessage((payload) => {
//   console.log('[firebase-messaging-sw.js] 백그라운드 메세지 도착 ', payload);
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
