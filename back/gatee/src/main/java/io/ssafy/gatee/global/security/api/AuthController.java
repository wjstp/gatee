package io.ssafy.gatee.global.security.api;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import io.ssafy.gatee.global.security.dto.response.AuthRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth/")
public class AuthController {

    private final MemberRepository memberRepository;

    @PostMapping("/kakao/login")
    public AuthRes registerMember(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Member member = memberRepository.findById(customUserDetails.getMemberId()).orElseThrow(()-> new MemberNotFoundException(ExceptionMessage.MEMBER_NOT_FOUND));
        return AuthRes.builder().name(member.getName()).build();

    }
}
