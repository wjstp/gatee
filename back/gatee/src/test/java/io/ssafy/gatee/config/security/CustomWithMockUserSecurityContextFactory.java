package io.ssafy.gatee.config.security;

import io.ssafy.gatee.domain.member.application.MemberService;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

public class CustomWithMockUserSecurityContextFactory implements WithSecurityContextFactory<CustomWithMockUser> {

    @Override
    public SecurityContext createSecurityContext(CustomWithMockUser annotation) {
        Collection<GrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + annotation.role()));
        CustomUserDetails customUserDetails = CustomUserDetails.builder()
                .username(annotation.memberId())
                .memberId(UUID.fromString(annotation.memberId()))
                .password(UUID.randomUUID().toString())
                .authorities(authorities)
                .privilege(annotation.role())
                .isAccountNonLocked(true)
                .isEnabled(true)
                .isCredentialsNonExpired(true)
                .isAccountNonExpired(true)
                .build();
        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = new UsernamePasswordAuthenticationToken(customUserDetails, null, authorities);
        securityContext.setAuthentication(authentication);
        return securityContext;
    }
}
