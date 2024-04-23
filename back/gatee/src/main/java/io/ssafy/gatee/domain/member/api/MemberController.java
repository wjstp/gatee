package io.ssafy.gatee.domain.member.api;

import io.ssafy.gatee.domain.member.application.MemberService;
import io.ssafy.gatee.domain.member.dto.request.MemberInfoReq;
import io.ssafy.gatee.domain.member.dto.request.MemberReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;
import java.util.UUID;

@RestController
@RequestMapping("/api/members")
@RequiredArgsConstructor
@Slf4j
public class MemberController {
    private final MemberService memberService;

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void register(@RequestBody MemberReq memberReq) {
        memberService.register(memberReq.name(), memberReq.nickname());
    }

    // 1. 회원 정보 등록
    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveInfo(@RequestBody MemberInfoReq memberInfoReq) throws ParseException {
        memberService.saveMemberInfo(memberInfoReq);
    }

    // 2. 회원 정보 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public MemberInfoRes readInfo(
            @RequestParam("familyId") Long familyId,
            @RequestParam("memberId") String memberId
    ) {
        log.info(String.valueOf(familyId));
        log.info(memberId);
        return memberService.readMemberInfo(familyId, UUID.fromString(memberId));
    }


    // 3. 상태 등록

}
