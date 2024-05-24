package io.ssafy.gatee.domain.push_notification.dto.response;

import io.ssafy.gatee.domain.member_notification.entity.MemberNotification;
import lombok.Builder;

@Builder
public record NotificationAgreementRes(
        boolean albumNotification,
        boolean naggingNotification,
        boolean scheduleNotification,
        boolean featureNotification,
        boolean chatNotification
) {
    public static NotificationAgreementRes toDto(MemberNotification memberNotification) {
        return NotificationAgreementRes.builder()
                .albumNotification(memberNotification.isAlbumNotification())
                .scheduleNotification(memberNotification.isScheduleNotification())
                .naggingNotification(memberNotification.isNaggingNotification())
                .featureNotification(memberNotification.isFeatureNotification())
                .chatNotification(memberNotification.isChatNotification())
                .build();
    }
}

