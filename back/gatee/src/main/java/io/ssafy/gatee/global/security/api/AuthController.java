package io.ssafy.gatee.global.security.api;

import io.ssafy.gatee.global.security.application.AuthService;
import io.ssafy.gatee.global.security.dto.request.KakaoTokenReq;
import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
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

    // 모바일 카카오 로그인시 발급받은 accesstoken을 보내면
    // 해당 accessToken으로 카카오 리소스 서버에 회원 정보 요청 후 db에 없는 값이라면 회원가입(회원정보 저장 휴 토큰 발급) 있다면 로그인(바로 토큰 발급)
    // token 발급
    @PostMapping("/kakao")
    public void authenticateKakaoMember(@RequestBody KakaoTokenReq kakaoTokenReq) {
        KakaoTokenRes kakaoTokenRes = authService.requestKakaoUserInfo(kakaoTokenReq.accessToken());

    }
}
