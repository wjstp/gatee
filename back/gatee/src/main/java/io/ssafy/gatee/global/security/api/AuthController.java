package io.ssafy.gatee.global.security.api;

import io.ssafy.gatee.global.security.application.AuthService;
import io.ssafy.gatee.global.security.dto.request.KakaoTokenReq;
import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
import io.ssafy.gatee.global.security.user.UserSecurityDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/kakao")
    public void authenticateKakaoMember(@RequestBody KakaoTokenReq kakaoTokenReq) {
        // 유저 정보 kakao로부터 받아오기
        KakaoTokenRes kakaoTokenRes = authService.requestKakaoUserInfo(kakaoTokenReq.accessToken());
        // 회원가입 또는 로그인 - OAuth2User 반환
        UserSecurityDTO userSecurityDTO = authService.loadUserSecurityDTO(kakaoTokenRes);


    }
}
