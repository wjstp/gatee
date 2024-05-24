package io.ssafy.gatee.domain.mission.application;

import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.mission.dao.MissionRepository;
import io.ssafy.gatee.domain.mission.dao.MissionRepositoryCustom;
import io.ssafy.gatee.domain.mission.dto.request.MissionTypeReq;
import io.ssafy.gatee.domain.mission.dto.response.MissionImprovementsRes;
import io.ssafy.gatee.domain.mission.dto.response.MissionInfoRes;
import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;
import io.ssafy.gatee.domain.mission.entity.Mission;
import io.ssafy.gatee.domain.mission.entity.Type;
import io.ssafy.gatee.global.exception.error.bad_request.DidNotCompleted;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.DID_NOT_COMPLETED;
import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_FAMILY_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MissionServiceImpl implements MissionService {

    private final MissionRepository missionRepository;
    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final MissionRepositoryCustom missionRepositoryCustom;

    // 미션 목록 확인
    @Override
    public MissionInfoRes readMission(UUID memberId, UUID familyId) {

        Member member = memberRepository.getReferenceById(memberId);

        Family family = familyRepository.getReferenceById(familyId);

        List<Mission> missionList = missionRepository.findAllByMember(member);

        Mission myAlbumMission = missionList.stream().filter(mission -> mission.getType().equals(Type.ALBUM)).toList().get(0);
        Mission myExamMission = missionList.stream().filter(mission -> mission.getType().equals(Type.EXAM)).toList().get(0);
        Mission myFeatureMission = missionList.stream().filter(mission -> mission.getType().equals(Type.FEATURE)).toList().get(0);
        Mission myScheduleMission = missionList.stream().filter(mission -> mission.getType().equals(Type.SCHEDULE)).toList().get(0);

        List<MissionListRes> missionListRes = missionList.stream().map(MissionListRes::toDto).toList();

        List<MemberFamily> memberFamilyList = memberFamilyRepository.findAllByFamily(family)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        List<Member> memberList = memberFamilyList.stream().map(MemberFamily::getMember).toList();

        MissionImprovementsRes missionImprovementsRes;

        if (memberList.size() == 1) {
            missionImprovementsRes = MissionImprovementsRes.builder()
                    .albumMission(false)
                    .examMission(false)
                    .featureMission(false)
                    .scheduleMission(false)
                    .build();
        } else {
            missionImprovementsRes = MissionImprovementsRes.builder()
                    .albumMission(missionRepositoryCustom.findByMemberListAndType(memberList, Type.ALBUM).get(0) == myAlbumMission)
                    .examMission(missionRepositoryCustom.findByMemberListAndType(memberList, Type.EXAM).get(0) == myExamMission)
                    .featureMission(missionRepositoryCustom.findByMemberListAndType(memberList, Type.FEATURE).get(0) == myFeatureMission)
                    .scheduleMission(missionRepositoryCustom.findByMemberListAndType(memberList, Type.SCHEDULE).get(0) == myScheduleMission)
                    .build();
        }

        return MissionInfoRes.toDto(missionImprovementsRes, missionListRes);
    }

    // 미션 수행
    @Override
    @Transactional
    public void progressMission(UUID memberId, MissionTypeReq missionTypeReq) {
        Member member = memberRepository.getReferenceById(memberId);

        Mission mission = missionRepository.findByMemberAndType(member, missionTypeReq.type());

        mission.increaseRange(missionTypeReq);
    }

    // 미션 완료
    @Override
    @Transactional
    public void completeMission(UUID memberId, Type type) {
        Member member = memberRepository.getReferenceById(memberId);

        Mission mission = missionRepository.findByMemberAndType(member, type);

        if (mission.isComplete()) {
            mission.doComplete();

            MemberFamily memberFamily = memberFamilyRepository.findByMember(member)
                    .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

            Family family = memberFamily.getFamily();

            family.increaseScore();

        } else {
            throw new DidNotCompleted(DID_NOT_COMPLETED);
        }
    }
}
