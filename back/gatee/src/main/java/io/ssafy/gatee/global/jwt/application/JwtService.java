package io.ssafy.gatee.global.jwt.application;

import io.jsonwebtoken.Claims;
import io.ssafy.gatee.global.jwt.dao.RefreshTokenRedisRepository;
import io.ssafy.gatee.global.jwt.dto.RefreshToken;
import io.ssafy.gatee.global.jwt.exception.RefreshTokenException;
import io.ssafy.gatee.global.jwt.util.JwtClaimsParser;
import io.ssafy.gatee.global.jwt.util.JwtProvider;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtService {

    private final JwtProvider jwtProvider;
    private final JwtClaimsParser jwtClaimsParser;
    private final RefreshTokenRedisRepository refreshTokenRepository;
    private static final String ACCESS_HEADER_AUTHORIZATION = "Authorization";
    private static final String TOKEN_PREFIX = "Bearer ";
    private final String AUTHORITIES_KEY = "authorities";

    public Authentication authenticateJwtToken(HttpServletRequest request) {
        String token = parseJwt(request);

        CustomUserDetails customUserDetails;

        log.info("토큰 parse 완료");
        if (Objects.isNull(token)) {
            customUserDetails = CustomUserDetails.builder()
                    .username(UUID.randomUUID().toString())
                    .password(UUID.randomUUID().toString())
                    .privilege("ANONYMOUS")
                    .authorities(jwtClaimsParser.getAnonymousAuthorities())
                    .isAccountNonLocked(true)
                    .isCredentialsNonExpired(true)
                    .isAccountNonExpired(true)
                    .build();
        } else {
            Claims claims = verifyJwtToken(token);
            // member를 생성하여 값 set
            customUserDetails = CustomUserDetails.builder()
                    .username(claims.getSubject())
                    .privilege(claims.get("privilege").toString())
                    .authorities((Collection<? extends GrantedAuthority>) claims.get(AUTHORITIES_KEY))
                    .password(UUID.randomUUID().toString())
                    .isAccountNonLocked(true)
                    .isCredentialsNonExpired(true)
                    .isAccountNonExpired(true)
                    .build();
        }

        return new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
    }

    public String parseJwt(HttpServletRequest request) {
        if (!request.getRequestURI().startsWith("/chat")) {
            // request에서 Authorization헤더를 찾음
            String authorization = request.getHeader(ACCESS_HEADER_AUTHORIZATION);

            // Authorization 헤더 검증
            if (Objects.isNull(authorization)) {
                log.info("토큰이 존재하지 않습니다.");
                return null;
            }
            if (!authorization.startsWith(TOKEN_PREFIX)) {
                log.info("접두사가 일치하지 않습니다.");
                return null;
            }
            // Bearer 제거 후 순수 토큰 획득
            return authorization.split(" ")[1];
        }

        return request.getParameter("Token");
    }

    // token 갱신
    public String rotateAccessToken(String refreshToken) {
        Claims claims = verifyJwtToken(refreshToken);
        String memberId = claims.getSubject();
        RefreshToken redisRefreshToken = refreshTokenRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RefreshTokenException(RefreshTokenException.REFRESH_TOKEN_ERROR.BAD_REFRESH));
        if (!redisRefreshToken.getRefreshToken().equals(refreshToken)) {
            log.info("일치하는 리프레시 토큰이 존재하지 않습니다.");
            throw new RefreshTokenException(RefreshTokenException.REFRESH_TOKEN_ERROR.BAD_REFRESH);
        }
        Authentication authentication = jwtClaimsParser.getAuthentication(refreshToken);
        return jwtProvider.generateAccessToken(authentication);
    }

    public Claims verifyJwtToken(String token) {
        log.info("토큰 verify 시작");
        return jwtClaimsParser.verifyJwtToken(token);
    }

    public void saveToken(String memberId, String refreshToken) {
        refreshTokenRepository.save(
                RefreshToken.builder()
                        .memberId(memberId)
                        .refreshToken(refreshToken)
                        .build());
    }

    public Cookie createCookie(String refreshToken) {
        log.info("refreshtoken 확인 " + refreshToken);
        String cookieName = "Refresh-Token";
        Cookie cookie = new Cookie(cookieName, refreshToken);
        // 쿠키 속성 설정
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/api/jwt");
        cookie.setMaxAge(60 * 60 * 24 * 15);
        return cookie;
    }


    public void publishTokens(HttpServletResponse response, Authentication authentication) {
        String accessToken = jwtProvider.generateAccessToken(authentication);
        response.addHeader("Authorization", "Bearer " + accessToken);
        log.info("access token 발급 완료");

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        // 삭제
        log.info("기존 refresh token이 있는 경우 삭제");
        Optional<RefreshToken> oldRefreshToken = refreshTokenRepository.findByMemberId(customUserDetails.getMemberId().toString());
        oldRefreshToken.ifPresent(refreshTokenRepository::delete);

        // 갱신
        String newRefreshToken = jwtProvider.generateRefreshToken(authentication);
        saveToken(customUserDetails.getUsername(), newRefreshToken);
        Cookie cookie = createCookie(newRefreshToken);
        response.addCookie(cookie);
        log.info("refresh token 발급 완료");
    }

}
