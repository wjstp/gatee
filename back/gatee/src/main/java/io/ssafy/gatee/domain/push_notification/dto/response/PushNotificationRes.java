package io.ssafy.gatee.domain.push_notification.dto.response;

import io.ssafy.gatee.domain.push_notification.entity.PushNotifications;
import lombok.Builder;

@Builder
public record PushNotificationRes(

        String notificationId,
        String type,
        Long typeId,
        String senderId,
        String title,
        String content,
        boolean isCheck,
        String createdAt
) {
    public static PushNotificationRes toDto(PushNotifications pushNotifications) {
        return PushNotificationRes.builder()
                .notificationId(pushNotifications.getNotificationId().toString())
                .type(pushNotifications.getType())
                .typeId(pushNotifications.getTypeId())
                .senderId(pushNotifications.getSenderId())
                .title(pushNotifications.getTitle())
                .content(pushNotifications.getContent())
                .createdAt(pushNotifications.getCreatedAt())
                .isCheck(pushNotifications.isCheck())
                .build();
    }
}
