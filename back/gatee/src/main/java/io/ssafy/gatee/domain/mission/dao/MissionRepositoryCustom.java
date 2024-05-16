package io.ssafy.gatee.domain.mission.dao;

import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.mission.entity.Type;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MissionRepositoryCustom {

    List<Member> findByMemberListAndType(List<Member> memberList, Type type);
}
