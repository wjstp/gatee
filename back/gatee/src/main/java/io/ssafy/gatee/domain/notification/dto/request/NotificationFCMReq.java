package io.ssafy.gatee.domain.notification.dto.request;

import io.ssafy.gatee.domain.notification.entity.Type;

public record NotificationFCMReq(

        Type type,
        Long typeId,
        String title,
        String content

) {
}
