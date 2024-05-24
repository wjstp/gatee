package io.ssafy.gatee.domain.mission.dao;


import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.mission.entity.Mission;
import io.ssafy.gatee.domain.mission.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepository extends JpaRepository<Mission, Long> {

    List<Mission> findAllByMember(Member member);

    Mission findByMemberAndType(Member member, Type type);
}
