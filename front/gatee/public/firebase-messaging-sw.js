// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyCiiaCQgXFvOYDt5jzzRIHwnhC_kCJ5op8",
  projectId: "gatee-bf33f",
  messagingSenderId: "1009013790999",
  appId: "1:1009013790999:web:e4273021380c2598cd7f52",
});


const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/app_icon.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onMessage((payload) => {
  console.log(payload?.notification?.title)
  console.log(payload?.notification?.body)
})