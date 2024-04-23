package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;

public interface AuthService {
    KakaoTokenRes requestKakaoUserInfo(String accessToken);
}
