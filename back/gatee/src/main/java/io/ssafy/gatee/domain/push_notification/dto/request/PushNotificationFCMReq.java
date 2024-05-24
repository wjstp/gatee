package io.ssafy.gatee.domain.push_notification.dto.request;

import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record PushNotificationFCMReq(

        String senderId,

        List<UUID> receiverId,

        String title,

        String content,

        DataFCMReq dataFCMReq

) {
}
