package io.ssafy.gatee.global.security.user;

import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member.entity.Privilege;
import lombok.Builder;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Map;
import java.util.UUID;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class UserSecurityDTO implements UserDetails {
    private String username;

    private Collection<? extends GrantedAuthority> authorities;

    private Privilege privilege;

    private String password;

    private boolean isAccountNonLocked;

    private boolean isAccountNonExpired;

    private boolean isCredentialsNonExpired;

    private boolean isEnabled;


    public static UserSecurityDTO toUserSecurityDTO(Member member) {
        System.out.println("dto로 변환");
        return UserSecurityDTO.builder()
                .username(member.getId().toString())
                .authorities(toAuthorities(member))
                .password(UUID.randomUUID().toString())
                .isAccountNonLocked(true)
                .isEnabled(true)
                .isCredentialsNonExpired(true)
                .isAccountNonExpired(true)
                .build();

    }
    public static Collection<? extends GrantedAuthority> toAuthorities(Member member) {
        return AuthorityUtils.createAuthorityList(member.getPrivilege().stream()
                .map(Enum::toString).collect(Collectors.toList()));
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(this.authorities.toString());
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
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
