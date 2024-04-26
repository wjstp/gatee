package io.ssafy.gatee.global.jwt.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.ssafy.gatee.global.security.user.UserSecurityDTO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

@Slf4j
@Component
public class JwtClaimsParser {
    private final String AUTHORITIES_KEY = "authorities";  // todo : 이후 수정할 것

    private SecretKey secretKey;
    public JwtClaimsParser(
            @Value("${jwt.secret}")
            String secret
    ) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }
    public Claims verifyJwtToken(String token) {
        return Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        Collection<? extends GrantedAuthority> authorities = getAuthorities(claims);
        UserSecurityDTO principal = UserSecurityDTO.builder()
                .username(claims.getSubject())
                .authorities(authorities)
                .isEnabled(true)
                .isAccountNonExpired(true)
                .isCredentialsNonExpired(true)
                .isAccountNonLocked(true)
                .build();

        return new UsernamePasswordAuthenticationToken(principal, token, authorities);
    }

    // 일반 유저 authority 가져오기
    private Collection<? extends GrantedAuthority> getAuthorities(Claims claims) {
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get(AUTHORITIES_KEY).toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toCollection(ArrayList::new));
        return authorities;
    }
    
    // 익명 유저  authority 별도로? 우리 서비스에서는 안필요할 수도 있을 것 같음
}
