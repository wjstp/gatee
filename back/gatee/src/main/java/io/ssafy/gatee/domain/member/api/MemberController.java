package io.ssafy.gatee.domain.member.api;

import io.ssafy.gatee.domain.member.application.MemberService;
import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberReq;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.global.security.user.UserSecurityDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.UUID;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;

    // 회원 가입
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void register(@RequestBody MemberReq memberReq) {
        memberService.register(memberReq.name(), memberReq.nickname());
    }

    // 회원 정보 등록 (회원 가입 후 처음)
    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveInfo(@Valid @RequestBody MemberSaveReq memberSaveReq, UserSecurityDTO userSecurityDTO) throws ParseException {
        memberService.saveMemberInfo(memberSaveReq, UUID.fromString(userSecurityDTO.getUsername()));
    }

    // 회원 정보 수정
    @PatchMapping("/profile")
    @PreAuthorize("hasRole('USER')")
    @ResponseStatus(HttpStatus.OK)
    public void editInfo(@Valid @RequestBody MemberEditReq memberEditReq) throws ParseException {
        memberService.editMemberInfo(memberEditReq);
    }

    // 프로필 이미지 수정 - file 추가 예정
//    @PatchMapping("/image")
//    @ResponseStatus(HttpStatus.OK)
//    public void editProfileImage(@Valid @RequestBody String imageUrl) {
//
//    }

    // 기분 상태 수정
    @PatchMapping("/moods")
    @ResponseStatus(HttpStatus.OK)
    public void editMood(@Valid @RequestBody MemberEditMoodReq memberEditMoodReq) {
        memberService.editMood(memberEditMoodReq);
    }

    // 회원 정보 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public MemberInfoRes readInfo(
            @RequestParam Long familyId,
            @RequestParam String memberId
    ) {
        log.info(String.valueOf(familyId));
        log.info(memberId);
        return memberService.readMemberInfo(familyId, UUID.fromString(memberId));
    }
}
