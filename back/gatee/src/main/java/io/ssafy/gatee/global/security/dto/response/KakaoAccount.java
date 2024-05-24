package io.ssafy.gatee.global.security.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoAccount(

        String email,

        @JsonProperty(value = "profile")
        KakaoProfile kakaoProfile
) {
}
