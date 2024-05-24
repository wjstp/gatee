package io.ssafy.gatee.domain.push_notification.dao;

import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationPageRes;
import org.springframework.data.domain.Pageable;

public interface CustomPushNotificationRepository {

    PushNotificationPageRes findMyPushNotifications(String receiverId, Pageable pageable, String cursor);
}
