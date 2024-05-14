self.addEventListener("install", function (e) {
  console.log("FCM Service Worker install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("FCM Service Worker activate..");
});

// 전역 푸시 알림 받는 설정
self.addEventListener("push", function (e) {
  console.log("푸시 e.data.json(): ", e.data.json());
  if (!e.data.json()) return;

  // 사용자가 보고 있고, 알림이 채팅이면 알림이 안뜸
  self.addEventListener("visibilitychange",function (e){
    if(e.data.json()?.notification?.title==="채팅") return;
  })

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
  console.log("event", event)
  const clickedNotification = event.notification;
  console.log("event.notification", event.notification)
  console.log("event.notification.data.url", event.notification.data.url)
  clickedNotification.close();

  const pushPath = '/main';
  console.log("알림 클릭 시, 페이지 이동 : " + pushPath);

  // 클라이언트 측에서 해당 경로로 이동
  event.waitUntil(
    self.clients.openWindow(pushPath)
  );
});
