package io.ssafy.gatee.domain.push_notification.dto.response;

import java.util.List;

public record PushNotificationPageRes(
    List<PushNotificationRes> pushNotificationResList
) {
}
