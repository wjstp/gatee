package io.ssafy.gatee.global.jwt.filter;

import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.jwt.exception.AccessTokenException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final String KAKAO_USER_INFO_URL = "/api/auth/kakao/login";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (!request.getRequestURI().endsWith(KAKAO_USER_INFO_URL)) {
            log.info("토큰 검증 시작");
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (Objects.isNull(authentication)) {
                try {
                    authentication = jwtService.authenticateJwtToken(request);
                    // 세션에 사용자 등록 - securitycontextholder에 등록한다.
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    log.info(String.valueOf(authentication));
                    log.info("토큰 검증 완료");
                    // 그 다음 필터로 이동
                    filterChain.doFilter(request, response);
                } catch (AccessTokenException accessTokenException) {
                    accessTokenException.addResponseError(response);
                }
            }
        }
    }
}
