package io.ssafy.gatee.global.security.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record KakaoTokenRes(
        @JsonProperty(value = "kakao_account")
        KakaoAccount kakaoAccount

) {
}
