package io.ssafy.gatee.global.jwt.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.ssafy.gatee.global.security.user.UserSecurityDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Collection;
import java.util.Date;
import java.util.stream.Collectors;


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
        System.out.println("test");
        System.out.println(authentication);
        return generateToken(authentication, accessTokenExpiration);
    }

    public String generateRefreshToken(Authentication authentication) {
        return generateToken(authentication, refreshTokenExpiration);
    }

    public String generateToken(Authentication authentication, long expiration) {
        UserSecurityDTO userSecurityDTO = (UserSecurityDTO) authentication.getPrincipal();
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .claim(AUTHORITIES_KEY, userSecurityDTO.getAuthorities())
                .issuedAt(new Date(now))
                .subject(userSecurityDTO.getUsername())
                .expiration(new Date(now + expiration))
                .signWith(secretKey)
                .compact();
    }


}
