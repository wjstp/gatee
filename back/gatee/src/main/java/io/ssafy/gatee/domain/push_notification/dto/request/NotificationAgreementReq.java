package io.ssafy.gatee.domain.push_notification.dto.request;

public record NotificationAgreementReq(
        boolean albumNotification,
        boolean naggingNotification,
        boolean scheduleNotification,
        boolean featureNotification,
        boolean chatNotification
) {
}
