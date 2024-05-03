import firebase from "firebase/app";

export async function getToken() {
  const messaging = firebase.messaging();
  const token = await messaging.getToken({
    vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
  });

  console.log(token)
  return token;
}

export async function getPermission() {
  const messaging = firebase.messaging();
  const token = await messaging.getToken({
    vapidKey: process.env.REACT_APP_FCM_VAPID_KEY,
  });

  console.log(token)
  return token;
}
