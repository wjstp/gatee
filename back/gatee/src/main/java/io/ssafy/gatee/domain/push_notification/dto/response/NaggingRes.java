package io.ssafy.gatee.domain.push_notification.dto.response;

import lombok.Builder;

@Builder
public record NaggingRes(
        String naggingMessage
) {
}
