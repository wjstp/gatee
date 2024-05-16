package io.ssafy.gatee.global.batch.dto;

import lombok.Builder;

@Builder
public record FeatureNotificationDTO(
        String question,
        String answer,
        String feature
) {
}
