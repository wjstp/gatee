package io.ssafy.gatee.global.batch.dto;

import lombok.Builder;

import java.util.UUID;

@Builder
public record FeatureNotificationDTO(

        UUID receiverId,
        String question,
        String answer
) {
}
