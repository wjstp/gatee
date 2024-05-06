package io.ssafy.gatee.domain.push_notification.application;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationRes;
import io.ssafy.gatee.domain.push_notification.entity.Type;


import java.util.List;
import java.util.UUID;

public interface PushNotificationService {

    List<PushNotificationRes> readNotifications(UUID memberId);

    void sendTestPush(String token) throws FirebaseMessagingException;

    String findTokenByMemberId(String memberId);

    void savePushNotification();

    void savePushNotifications();

    void sendNagging(NaggingReq naggingReq) throws FirebaseMessagingException;

    void sendPushOneToOne(String receiverToken, Type type, Long typeId) throws FirebaseMessagingException;

    void sendPushOneToMany(String senderToken, List<String> refreshTokenList, Type type, Long typeId) throws FirebaseMessagingException;
}
