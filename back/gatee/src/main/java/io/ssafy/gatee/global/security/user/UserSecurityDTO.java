package io.ssafy.gatee.global.security.user;

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

@Getter
@Builder
public class UserSecurityDTO implements UserDetails {
    private UUID memberId;
    //    private String email;
    private Map<String, Object> props;  // todo: 받아온 값들 객체로

    private Privilege privilege;
    private String password;

    //    public String getEmail() {
//        return this.getEmail();
//    }
    public Map<String, Object> getAttributes() {
        return this.getProps();
    }

    public UserDetails toUserDetails() {
        return User.withUsername(this.getUsername())
                .password(UUID.randomUUID().toString())
                .authorities(this.getAuthorities())
                .accountExpired(!this.isAccountNonExpired())
                .accountLocked(!this.isAccountNonLocked())
                .credentialsExpired(!this.isCredentialsNonExpired())
                .disabled(!this.isEnabled())
                .build();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList(this.privilege.toString());
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.memberId.toString();
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
