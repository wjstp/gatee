package io.ssafy.gatee.global.security.dto.response;

import lombok.Builder;

@Builder
public record AuthRes(
        String name
) {
}
