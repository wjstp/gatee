package io.ssafy.gatee.domain.mission.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.mission.dao.MissionRepository;
import io.ssafy.gatee.domain.mission.dto.request.MissionTypeReq;
import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;
import io.ssafy.gatee.domain.mission.entity.Mission;
import io.ssafy.gatee.domain.mission.entity.Type;
import io.ssafy.gatee.global.exception.error.bad_request.DidNotCompleted;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MissionServiceImpl implements MissionService {

    private final MissionRepository missionRepository;

    private final MemberRepository memberRepository;

    // 미션 목록 확인
    @Override
    public List<MissionListRes> readMission(UUID memberId) {

        Member member = memberRepository.getReferenceById(memberId);

        List<Mission> missionList = missionRepository.findAllByMember(member);

        return missionList.stream().map(MissionListRes::toDto).toList();
    }

    // 미션 수행
    @Override
    public void progressMission(UUID memberId, MissionTypeReq missionTypeReq) {
        Member member = memberRepository.getReferenceById(memberId);

        Mission mission = missionRepository.findByMemberAndType(member, missionTypeReq.type());

        mission.increaseRange(missionTypeReq);
    }

    // 미션 완료
    @Override
    public void completeMission(UUID memberId, Type type) {
        Member member = memberRepository.getReferenceById(memberId);

        Mission mission = missionRepository.findByMemberAndType(member, type);

        if (mission.isComplete()) {
            mission.doComplete();
        } else {
            throw new DidNotCompleted(DID_NOT_COMPLETED);
        }
    }
}
