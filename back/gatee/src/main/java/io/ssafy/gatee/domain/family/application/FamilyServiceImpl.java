package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.dto.response.MemberFamilyInfoRes;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FamilyServiceImpl implements FamilyService {

    private final FamilyRepository familyRepository;

    private final MemberFamilyRepository memberFamilyRepository;

    // 가족 생성
    @Override
    @Transactional
    public void saveFamily(FamilySaveReq familySaveReq) {
        Member member = Member.builder()
                .id(UUID.fromString(familySaveReq.memberId()))
                .build();

        Family family = familyRepository.save(Family.builder()
                .name(familySaveReq.name())
                .score(0)
                .build());

        MemberFamily memberFamily = MemberFamily.builder()
                .member(member)
                .family(family)
                .isLeader(true)
                .build();

        memberFamilyRepository.save(memberFamily);
    }

    // 가족 정보 및 구성원 조회
    @Override
    public FamilyInfoRes readFamily(Long familyId) throws FamilyNotFoundException {
        Family family = familyRepository.findById(familyId)
                .orElseThrow(() -> new FamilyNotFoundException(FAMILY_NOT_FOUND));

        List<MemberFamily> memberFamily = memberFamilyRepository.findAllById(familyId)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        List<MemberFamilyInfoRes> memberFamilyInfoList = memberFamily.stream()
                .map(MemberFamilyInfoRes::toDto).toList();

        return FamilyInfoRes.builder()
                .name(family.getName())
                .familyScore(family.getScore())
                .memberFamilyInfoList(memberFamilyInfoList)
                .build();
    }

    // 가족 이름 수정
    @Override
    @Transactional
    public void editFamilyName(Long familyId, FamilyNameReq familyNameReq) throws FamilyNotFoundException {
        Family family = familyRepository.findById(familyId)
                .orElseThrow(() -> new FamilyNotFoundException(FAMILY_NOT_FOUND));

        family.editFamilyName(familyNameReq.name());
    }
}
