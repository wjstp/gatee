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
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class CustomOAuth2LoginFilter extends OncePerRequestFilter {

    private final String KAKAO_USER_INFO_URL = "/api/auth/kakao/login";
    private final AuthService authService;
    private final JwtService jwtService;
    private final JwtProvider jwtProvider;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
    private final CustomOAuth2FailureHandler customOAuth2FailureHandler;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("접근 uri" + request.getRequestURI());
        log.info("카카오 access token" + request.getHeader("Kakao-Access-Token"));   //todo : 확인
        // 모바일에서 토큰을 가지고 요청하는 uri인지 확인
        if (request.getRequestURI().endsWith(KAKAO_USER_INFO_URL)){ // todo: 확인할 것
            try {
                log.info("1. 로그인 또는 회원가입 시도");

                // 유저 정보 kakao로부터 받아오기
                KakaoTokenRes kakaoTokenRes = authService.requestKakaoUserInfo(request.getHeader("Kakao-Access-Token"));
                log.info("2. 카카오 토큰 확인 및 회원 정보 로드 완료");

                // 회원가입 또는 로그인 - OAuth2User 반환
                UserSecurityDTO userSecurityDTO = authService.loadUserSecurityDTO(kakaoTokenRes);
                log.info("3. 회원가입 또는 로그인 완료");

                // spring security contextholder에 설정
                SecurityContext securityContext = SecurityContextHolder.getContext();
                Authentication authentication = new UsernamePasswordAuthenticationToken(userSecurityDTO, null, userSecurityDTO.getAuthorities());
                securityContext.setAuthentication(authentication);
                SecurityContextHolder.setContext(securityContext);
                log.info(securityContext.getAuthentication().getPrincipal().toString());
                log.info("4. spring context 설정 완료");
                System.out.println("@@@@@@@@@@@@@@@" + securityContext.getAuthentication());

                // 로그인 성공 핸들러 호출
                customOAuth2SuccessHandler.onAuthenticationSuccess(request, response, authentication);
                log.info("5. 인증 작업 및 토큰 발급 완료");
            } catch (Exception exception){
                // 로그인 실패 핸들러 호출
                customOAuth2FailureHandler.onAuthenticationFailure(request, response, new BadCredentialsException("인증 실패"));
            }
        }
        filterChain.doFilter(request, response);
    }

}
