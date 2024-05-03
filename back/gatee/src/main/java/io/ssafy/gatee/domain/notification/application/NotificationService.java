package io.ssafy.gatee.domain.notification.application;

import com.google.firebase.messaging.FirebaseMessagingException;

public interface NotificationService {


    void sendPush(String token) throws FirebaseMessagingException;
}
