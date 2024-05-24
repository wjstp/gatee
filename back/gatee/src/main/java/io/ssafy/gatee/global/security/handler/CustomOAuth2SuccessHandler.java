package io.ssafy.gatee.global.security.handler;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
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
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final String REDIRECT_URI_SUCCESS = "/main";
    private final String REDIRECT_URI_NOT_FAMILY = "/signup";
    private final String REDIRECT_URI_ANONYMOUS = "/signup/member-set";


    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("로그인 성공");
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();
        log.info("test" + customUserDetails.getMemberId());
        jwtService.publishTokens(response, authentication);
        response.setStatus(200);
        String name = memberRepository.findById(customUserDetails.getMemberId())
                .orElseThrow(() -> new MemberNotFoundException(ExceptionMessage.MEMBER_NOT_FOUND)).getName();
        String redirectUrl = "";
        if (isAnonymousMember(customUserDetails)) {
            if (memberFamilyRepository.existsByMember_Id(customUserDetails.getMemberId())) {
                log.info("회원 정보 기입 페이지로 이동");
                redirectUrl = REDIRECT_URI_ANONYMOUS;
            } else {
                log.info("가족 정보 저장 페이지로 이동");
                redirectUrl = REDIRECT_URI_NOT_FAMILY;
            }
        } else {
            redirectUrl = REDIRECT_URI_SUCCESS;
        }
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"redirectUrl\":\"" + redirectUrl + "\"," +
                "\"name\":\"" + name + "\"}");
    }

    public boolean isAnonymousMember(CustomUserDetails customUserDetails) {
        if (customUserDetails.getAuthorities().isEmpty()) {
            throw new AccessTokenException(AccessTokenException.ACCESS_TOKEN_ERROR.UN_ACCEPT);
        }
        log.info(customUserDetails.getAuthorities().toString());
        return customUserDetails.getAuthorities().contains(new SimpleGrantedAuthority("ROLE_ANONYMOUS"));
    }
}
