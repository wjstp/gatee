package io.ssafy.gatee.domain.push_notification.dto.response;

import io.ssafy.gatee.domain.member_notification.entity.MemberNotification;
import io.ssafy.gatee.domain.push_notification.entity.Type;
import lombok.Builder;

import java.util.List;

@Builder
public record NotificationAgreementRes(
        boolean albumNotification,
        boolean naggingNotification,
        boolean scheduleNotification
){
    public static NotificationAgreementRes toDto(MemberNotification memberNotification){
        return NotificationAgreementRes.builder()
                .albumNotification(memberNotification.isAlbumNotification())
                .scheduleNotification(memberNotification.isScheduleNotification())
                .naggingNotification(memberNotification.isNaggingNotification())
                .build();
    }
}

