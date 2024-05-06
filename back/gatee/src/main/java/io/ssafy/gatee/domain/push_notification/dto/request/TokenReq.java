package io.ssafy.gatee.domain.push_notification.dto.request;

import jakarta.validation.constraints.NotBlank;

public record TokenReq(
        @NotBlank
        String token
) {
}
