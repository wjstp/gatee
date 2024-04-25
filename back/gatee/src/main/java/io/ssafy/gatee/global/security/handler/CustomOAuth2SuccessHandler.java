package io.ssafy.gatee.global.security.handler;

import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.jwt.util.JwtProvider;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizationSuccessHandler;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtProvider jwtProvider;

    private final JwtService jwtService;    //todo: provider로 모두 수정할 것

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        System.out.println("오는지 확인");
        
        log.info("로그인 성공");
        log.info(authentication.getPrincipal().toString());
        log.info(authentication.getAuthorities().toString());
        log.info(authentication.getDetails().toString());

        // access token 생성
        String accessToken = jwtProvider.generateAccessToken(authentication);
        System.out.println("access token 발급 완료");
        response.addHeader("Authorization", "Bearer " + accessToken);
        // refresh token 발급
        String refreshToken = jwtProvider.generateRefreshToken(authentication);

        // refresh token 저장
        jwtService.saveToken(accessToken, refreshToken);
        Cookie cookie = jwtService.createCookie(refreshToken);
        response.addCookie(cookie);//로그인 성공 메세지
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"message\":\"로그인되었습니다.\"}");
    }
}
