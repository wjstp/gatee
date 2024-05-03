package io.ssafy.gatee.global.jwt.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.ssafy.gatee.domain.member.entity.Privilege;
import io.ssafy.gatee.global.jwt.exception.AccessTokenException;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
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
    private final String AUTHORITIES_KEY = "authorities";

    private SecretKey secretKey;

    public JwtClaimsParser(
            @Value("${jwt.secret}")
            String secret
    ) {
        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());
    }

    public Claims verifyJwtToken(String token) {
        try {
            return Jwts.parser()
                    .verifyWith(secretKey)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
        } catch (MalformedJwtException malformedJwtException) {
            throw new AccessTokenException(AccessTokenException.ACCESS_TOKEN_ERROR.MAL_FORM);
        } catch (ExpiredJwtException expiredJwtException) {
            throw new AccessTokenException(AccessTokenException.ACCESS_TOKEN_ERROR.EXPIRED);
        } catch (SignatureException signatureException) {
            throw new AccessTokenException(AccessTokenException.ACCESS_TOKEN_ERROR.BAD_SIGN);
        }
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload();
        Collection<? extends GrantedAuthority> authority = (Collection<? extends GrantedAuthority>) claims.get(AUTHORITIES_KEY);
        CustomUserDetails customUserDetails = CustomUserDetails.builder()
                .username(claims.getSubject())
                .privilege(claims.get("privilege").toString())
                .authorities(authority)
                .isEnabled(true)
                .isAccountNonExpired(true)
                .isCredentialsNonExpired(true)
                .isAccountNonLocked(true)
                .build();

        return new UsernamePasswordAuthenticationToken(customUserDetails, token, getAuthorities(claims));
    }

    public Collection<? extends GrantedAuthority> getAuthorities(Claims claims) {
        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(("ROLE_" + claims.get(AUTHORITIES_KEY).toString()).split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toCollection(ArrayList::new));
        return authorities;
    }

    public Collection<? extends GrantedAuthority> getAnonymousAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + Privilege.ANONYMOUS));
        return authorities;
    }
}
