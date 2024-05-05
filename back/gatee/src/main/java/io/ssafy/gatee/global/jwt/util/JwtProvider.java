package io.ssafy.gatee.global.jwt.util;

import io.jsonwebtoken.Jwts;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;


@Slf4j
@Component
public class JwtProvider {

    private SecretKey secretKey;
    private final String AUTHORITIES_KEY = "authorities";
    private final long accessTokenExpiration;
    private final long refreshTokenExpiration;

    public JwtProvider(
            @Value("${jwt.secret}")
            String secret,
            @Value("${jwt.access-token-validity-in-seconds}")
            long accessTokenExpiration,
            @Value("${jwt.refresh-token-validity-in-seconds}")
            long refreshTokenExpiration
    ) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
        this.accessTokenExpiration = accessTokenExpiration;
        this.refreshTokenExpiration = refreshTokenExpiration;
    }

    public String generateAccessToken(Authentication authentication) {
        return generateToken(authentication, accessTokenExpiration);
    }

    public String generateRefreshToken(Authentication authentication) {
        return generateToken(authentication, refreshTokenExpiration);
    }

    public String generateToken(Authentication authentication, long expiration) {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        long now = System.currentTimeMillis();
        String authorities = authentication.getAuthorities()
                .stream()
                .map(grantedAuthority -> grantedAuthority.getAuthority()).toString();
        List<String> authority = ((CustomUserDetails) authentication.getPrincipal()).getAuthorities().stream().map(auth -> "ROLE_" + auth).toList();
        return Jwts.builder()
                .claim(AUTHORITIES_KEY, authority)
                .claim("privilege", ((CustomUserDetails) authentication.getPrincipal()).getPrivilege())
                .issuedAt(new Date(now))
                .subject(customUserDetails.getUsername())
                .expiration(new Date(now + expiration ))    // todo: 수정
                .signWith(secretKey)
                .compact();
    }
}
