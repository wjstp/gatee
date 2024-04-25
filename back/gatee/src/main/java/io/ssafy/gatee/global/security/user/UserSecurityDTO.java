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
//    private Map<String, Object> props;  // todo: 받아온 값들 객체로

    private Collection<? extends GrantedAuthority> authorities;

    private Privilege privilege;

    private String password;

    private boolean isAccountNonLocked;

    private boolean isCredentialsNonExpired;

    private boolean isEnabled;


    // todo: 커스텀할 것!!
    //    public String getEmail() {
//        return this.getEmail();
//    }
//    public Map<String, Object> getAttributes() {
//        return this.getProps();
//    }

    public UserDetails toUserDetails() {
        System.out.println("확인..");
        System.out.println(this.getUsername());
//        System.out.println(this.getAuthorities());
        var result = User.withUsername(this.getUsername())
                .password(UUID.randomUUID().toString())
                .authorities("USER")    // todo: authority 부분 수정
                .accountExpired(!this.isAccountNonExpired())
                .accountLocked(!this.isAccountNonLocked())
                .credentialsExpired(!this.isCredentialsNonExpired())
                .disabled(!this.isEnabled())
                .build();
        System.out.println("??????????????");
        System.out.println(result);
//        System.out.println(result.getAuthorities());
        return result;
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
