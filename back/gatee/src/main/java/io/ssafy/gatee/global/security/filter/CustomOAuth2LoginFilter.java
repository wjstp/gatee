package io.ssafy.gatee.global.security.filter;

import io.ssafy.gatee.global.security.application.AuthService;
import io.ssafy.gatee.global.security.dto.response.KakaoTokenRes;
import io.ssafy.gatee.global.security.handler.CustomOAuth2FailureHandler;
import io.ssafy.gatee.global.security.handler.CustomOAuth2SuccessHandler;
import io.ssafy.gatee.global.security.user.UserSecurityDTO;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2LoginFilter extends OncePerRequestFilter {

    private final String KAKAO_USER_INFO_URL = "/api/auth/kakao";
    private final AuthService authService;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 모바일에서 토큰을 가지고 요청하는 uri인지 확인
        log.trace("접근 uri" + request.getRequestURI());
        log.trace("카카오 access token" + request.getHeader("accessToken"));   //todo : 확인
        if (request.getRequestURI().endsWith(KAKAO_USER_INFO_URL)){ // todo: 확인할 것
            try {
                // 유저 정보 kakao로부터 받아오기
                KakaoTokenRes kakaoTokenRes = authService.requestKakaoUserInfo(request.getHeader("accessToken"));
                 // 회원가입 또는 로그인 - OAuth2User 반환
                UserSecurityDTO userSecurityDTO = authService.loadUserSecurityDTO(kakaoTokenRes);
                // userdetails로 변환
                UserDetails userDetails = userSecurityDTO.toUserDetails();
                // spring security contextholder에 설정
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()));
                SecurityContextHolder.setContext(securityContext);
                new CustomOAuth2SuccessHandler();
            } catch (Exception exception){
                new CustomOAuth2FailureHandler();
            }
        }
    }
}
