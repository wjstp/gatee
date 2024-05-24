package io.ssafy.gatee.domain.push_notification.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record PushNotificationPageRes(
        List<PushNotificationRes> pushNotificationResList,
        String nextCursor,
        boolean hasNext
) {
}
