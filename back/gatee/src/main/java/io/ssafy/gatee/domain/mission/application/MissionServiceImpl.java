package io.ssafy.gatee.domain.mission.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.mission.dao.MissionRepository;
import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;
import io.ssafy.gatee.domain.mission.entity.Mission;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MissionServiceImpl implements MissionService {

    private final MissionRepository missionRepository;

    private final MemberRepository memberRepository;

    @Override
    public List<MissionListRes> readMission(UUID memberId) {

        Member member = memberRepository.getReferenceById(memberId);

        List<Mission> missionList = missionRepository.findAllByMember(member);

        return missionList.stream().map(MissionListRes::toDto).toList();
    }
}
