package io.ssafy.gatee.global.security.filter;

import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.jwt.util.JwtProvider;
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
import org.springframework.security.core.Authentication;
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
    private final JwtService jwtService;
    private final JwtProvider jwtProvider;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // 모바일에서 토큰을 가지고 요청하는 uri인지 확인
        System.out.println("######################################");
        System.out.println((request.getHeader("Kakao-Access-Token")));
        System.out.println(request.getHeader("Connection"));
        log.trace("접근 uri" + request.getRequestURI());
        log.trace("카카오 access token" + request.getHeader("Kakao-Access-Token"));   //todo : 확인

        if (request.getRequestURI().endsWith(KAKAO_USER_INFO_URL)){ // todo: 확인할 것
            try {
                System.out.println("url : " + request.getRequestURI());
                System.out.println("검증 시작");
                // 유저 정보 kakao로부터 받아오기
                KakaoTokenRes kakaoTokenRes = authService.requestKakaoUserInfo(request.getHeader("Kakao-Access-Token"));
                System.out.println("카카오 토큰 확인 완료");
                 // 회원가입 또는 로그인 - OAuth2User 반환
                UserSecurityDTO userSecurityDTO = authService.loadUserSecurityDTO(kakaoTokenRes);
                System.out.println("회원검증 완료");
                System.out.println("userdetails 변환 전 확인 " + userSecurityDTO.getUsername());
                // userdetails로 변환
                UserDetails userDetails = userSecurityDTO.toUserDetails();
                System.out.println(userDetails.getUsername());
                // spring security contextholder에 설정
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                securityContext.setAuthentication(authentication);
                SecurityContextHolder.setContext(securityContext);
                // 로그인 성공 핸들러 호출
//                new CustomOAuth2SuccessHandler(jwtProvider, jwtService);
                System.out.println(userDetails.getUsername());
                customOAuth2SuccessHandler.onAuthenticationSuccess(request, response, authentication);
                System.out.println(userDetails.getUsername());

            } catch (Exception exception){
                // 로그인 실패 핸들러 호출
                new CustomOAuth2FailureHandler();
            }
        }
    }
}
