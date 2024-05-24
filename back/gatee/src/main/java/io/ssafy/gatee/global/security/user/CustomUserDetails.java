package io.ssafy.gatee.global.security.user;

import io.ssafy.gatee.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.UUID;

@Getter
@Builder
public class CustomUserDetails implements UserDetails {

    private String username;
    private UUID memberId;
    private Collection<? extends GrantedAuthority> authorities;
    private String privilege;
    private String password;
    private boolean isAccountNonLocked;
    private boolean isAccountNonExpired;
    private boolean isCredentialsNonExpired;
    private boolean isEnabled;


    public static CustomUserDetails toCustomUserDetails(Member member) {

        return CustomUserDetails.builder()
                .username(member.getId().toString())
                .privilege(member.getPrivilege().toString())
                .authorities(toAuthorities(member))
                .password(UUID.randomUUID().toString())
                .isAccountNonLocked(true)
                .isEnabled(true)
                .isCredentialsNonExpired(true)
                .isAccountNonExpired(true)
                .build();

    }

    public static Collection<? extends GrantedAuthority> toAuthorities(Member member) {
        return AuthorityUtils.createAuthorityList(String.valueOf(member.getPrivilege()));
    }

    public UUID getMemberId() {
        return UUID.fromString(this.username);
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + this.privilege));
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnabled;
    }
}
