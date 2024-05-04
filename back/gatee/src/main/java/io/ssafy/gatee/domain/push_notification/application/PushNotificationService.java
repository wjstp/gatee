package io.ssafy.gatee.domain.push_notification.application;

import com.google.firebase.messaging.FirebaseMessagingException;

public interface PushNotificationService {

    void sendTestPush(String token) throws FirebaseMessagingException;
}
