package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.dto.request.MemberInfoReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.member.entity.BirthType;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member.entity.Privilege;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.member_family.entity.Role;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@RequiredArgsConstructor
// 기본적으로 조회 로직이 많기 때문에 전체 read only 선언
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    private final MemberFamilyRepository memberFamilyRepository;


    @Override
    @Transactional
    public void register(String name, String nickname) {
        Member member = Member.builder()
                .name(name)
                .nickname(nickname)
                .privilege(Privilege.valueOf("USER"))
                .build();

        memberRepository.save(member);
    }


    @Override
    @Transactional  // transaction을 사용하기 위해 선언
    public void saveMemberInfo(MemberInfoReq memberInfoReq) throws ParseException {
        Member member = memberRepository.findById(UUID.fromString(memberInfoReq.memberId()))
                .orElseThrow(()-> new MemberNotFoundException(MEMBER_NOT_FOUND));

        member.saveInfo(memberInfoReq);

        MemberFamily memberFamily = new MemberFamily();

        memberFamily.saveRole(member, memberInfoReq.role());

        memberFamilyRepository.save(memberFamily);
    }


    @Override
    public MemberInfoRes readMemberInfo(Long familyId, UUID memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        MemberFamily memberFamily = memberFamilyRepository.findByMemberAndFamily_Id(member, familyId)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        return MemberInfoRes.builder()
                .memberId(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .birth(sdf.format(member.getBirth()))
                .birthType(String.valueOf(member.getBirthType()))
                .mood(member.getMood())
                .role(String.valueOf(memberFamily.getRole()))
                .build();
    }
}
