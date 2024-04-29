package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;

public interface AuthService {

    KakaoTokenRes requestKakaoUserInfo(String accessToken);

    CustomUserDetails loadUserSecurityDTO(KakaoTokenRes socialData);  // todo: 인자 수정

    Member register(KakaoTokenRes socialData); //todo: 인자 수정
}
