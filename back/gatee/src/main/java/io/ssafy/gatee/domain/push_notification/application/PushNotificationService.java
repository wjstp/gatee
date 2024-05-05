package io.ssafy.gatee.domain.push_notification.application;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;

public interface PushNotificationService {

    void sendTestPush(String token) throws FirebaseMessagingException;

    void sendNagging(NaggingReq naggingReq);
}
