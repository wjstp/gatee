package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member.entity.Privilege;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.member_family.entity.Role;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@RequiredArgsConstructor
// 기본적으로 조회 로직이 많기 때문에 전체 read only 선언
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;

    private final MemberFamilyRepository memberFamilyRepository;

    // 회원 가입
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

    // 회원 정보 저장
    @Override
    @Transactional  // transaction을 사용하기 위해 선언
    public void saveMemberInfo(MemberSaveReq memberSaveReq) throws ParseException {
        Member member = memberRepository.findById(UUID.fromString(memberSaveReq.memberId()))
                .orElseThrow(()-> new MemberNotFoundException(MEMBER_NOT_FOUND));

        member.saveInfo(memberSaveReq);

        MemberFamily memberFamily = memberFamilyRepository.findByMemberAndFamily_Id(member, Long.valueOf(memberSaveReq.familyId()))
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        memberFamily.editRole(memberSaveReq.role());
    }

    // 회원 정보 수정
    @Override
    @Transactional
    public void editMemberInfo(MemberEditReq memberEditReq) throws ParseException {
        Member member = memberRepository.findById(UUID.fromString(memberEditReq.memberId()))
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        member.editInfo(memberEditReq);

        MemberFamily memberFamily = memberFamilyRepository.findByMemberAndFamily_Id(member, Long.valueOf(memberEditReq.familyId()))
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        memberFamily.editRole(memberEditReq.role());
    }

    // 프로필 이미지 수정
    @Override
    @Transactional
    public void editProfileImage(String imageUrl) {

    }

    // 기분 상태 수정
    @Override
    @Transactional
    public void editMood(MemberEditMoodReq memberEditMoodReq) {
        Member member = memberRepository.findById(UUID.fromString(memberEditMoodReq.memberId()))
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        member.editMood(memberEditMoodReq.mood());
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
