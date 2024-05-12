package io.ssafy.gatee.global.security.handler;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Privilege;
import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.jwt.exception.AccessTokenException;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;

    private final MemberRepository memberRepository;

    private final String REDIRECT_URI_SUCCESS = "https://gaty.duckdns.org/main";

    private final String REDIRECT_URI_ANONYMOUS = "https://gaty.duckdns.org/signup/family-set";


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("로그인 성공");
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("test" + customUserDetails.getMemberId());
        jwtService.publishTokens(response, authentication);
        response.setStatus(200);
        UriComponentsBuilder uriComponentsBuilder;
        if (isAnonymousMember(customUserDetails)) {
            uriComponentsBuilder = UriComponentsBuilder.fromUriString(REDIRECT_URI_ANONYMOUS).queryParam("name");
        } else {
            uriComponentsBuilder = UriComponentsBuilder.fromUriString(REDIRECT_URI_SUCCESS);
        }
        String redirectURI = uriComponentsBuilder.toUriString();

        response.sendRedirect(redirectURI);
    }

    public boolean isAnonymousMember(CustomUserDetails customUserDetails) {
        if (customUserDetails.getAuthorities().isEmpty()) {
            throw new AccessTokenException(AccessTokenException.ACCESS_TOKEN_ERROR.UN_ACCEPT);
        }
        return customUserDetails.getAuthorities().contains(new SimpleGrantedAuthority(Privilege.ANONYMOUS.name()));
    }
}
