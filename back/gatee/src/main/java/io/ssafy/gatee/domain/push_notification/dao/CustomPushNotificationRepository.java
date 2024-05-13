package io.ssafy.gatee.domain.push_notification.dao;

import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationRes;

import java.awt.print.Pageable;

public interface CustomPushNotificationRepository {
    PushNotificationRes findMyPushNotifications(String receiverId, String cursor, Pageable pageable);

}
