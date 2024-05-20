package io.ssafy.gatee.domain.push_notification.application;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.domain.push_notification.dto.request.NotificationAgreementReq;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationFCMReq;
import io.ssafy.gatee.domain.push_notification.dto.response.NaggingRes;
import io.ssafy.gatee.domain.push_notification.dto.response.NotificationAgreementRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationPageRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationRes;
import io.ssafy.gatee.domain.push_notification.entity.Type;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.UUID;

public interface PushNotificationService {

    PushNotificationPageRes readNotifications(UUID memberId, Pageable pageable, String cursor);


    String findTokenByMemberId(UUID memberId);

    boolean checkAgreement(Type type, UUID memberId);

    void savePushNotification(PushNotificationFCMReq pushNotificationFCMReq);

    NaggingRes sendNagging(NaggingReq naggingReq, UUID memberId) throws FirebaseMessagingException;

    void sendPushOneToOne(PushNotificationFCMReq pushNotificationFCMReq) throws FirebaseMessagingException;

    void sendPushOneToMany(PushNotificationFCMReq pushNotificationFCMReq) throws FirebaseMessagingException;

    NotificationAgreementRes readNotificationAgreements(UUID memberId);

    void modifyNotificationAgreements(UUID memberId, NotificationAgreementReq agreementReq);

    void checkReadNotification(String notificationId);
    void sendTestPush(String token) throws FirebaseMessagingException;
}
