package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;

public interface AuthService {

    KakaoTokenRes requestKakaoUserInfo(String accessToken, HttpServletResponse httpServletResponse) throws IOException;

    CustomUserDetails loadUserSecurityDTO(KakaoTokenRes socialData);

    Member register(KakaoTokenRes socialData);
}
