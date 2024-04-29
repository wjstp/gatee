package io.ssafy.gatee.global.jwt.application;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.ssafy.gatee.global.jwt.dao.RefreshTokenRedisRepository;
import io.ssafy.gatee.global.jwt.dto.RefreshToken;
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
        // request에서 Authorization헤더를 찾음
        String authorization = request.getHeader(ACCESS_HEADER_AUTHORIZATION);

        // Authorization 헤더 검증
        if (Objects.isNull(authorization)) {
            log.info("토큰이 존재하지 않습니다.");   // todo: exception 추가
            return null;    //  todo: null 수정
        }
        if (!authorization.startsWith(TOKEN_PREFIX)) {
            log.info("접두사가 일치하지 않습니다.");
            return null;
        }
        // Bearer 제거 후 순수 토큰 획득
        return authorization.split(" ")[1];
    }

    // token 갱신
    public String rotateAccessToken(String refreshToken) {
        Claims claims = verifyJwtToken(refreshToken);// 예외처리 할 것
        String memberId = claims.getSubject();
        RefreshToken redisRefreshToken = refreshTokenRepository.findByMemberId(memberId)
                .orElseThrow(() -> new JwtException("일치하는 refreshtoken이 없다잉"));
        Authentication authentication = jwtClaimsParser.getAuthentication(refreshToken);
        return jwtProvider.generateAccessToken(authentication);
    }

    public Claims verifyJwtToken(String token) {
        log.info("토큰 검증 시작");
        try {
            return jwtClaimsParser.verifyJwtToken(token);
        } catch (MalformedJwtException malformedJwtException) {
            throw new RuntimeException("Malformed Token");  // todo: 수정
        }
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
        cookie.setPath("/auth/refresh");
        cookie.setMaxAge(15 & 50 * 60 * 24);
        return cookie;
    }

    public void publishTokens(HttpServletResponse response, Authentication authentication) {
        String accessToken = jwtProvider.generateAccessToken(authentication);
        response.addHeader("Authorization", "Bearer " + accessToken);
        log.info("access token 발급 완료");

        String refreshToken = jwtProvider.generateRefreshToken(authentication);
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        if (refreshTokenRepository.existsByMemberId(customUserDetails.getMemberId().toString())) {
            refreshTokenRepository.deleteByMemberId((customUserDetails.getMemberId().toString()));
        }
        saveToken(customUserDetails.getUsername(), refreshToken);
        Cookie cookie = createCookie(refreshToken);
        response.addCookie(cookie);
        log.info("refresh token 발급 완료");
    }

}
