package io.ssafy.gatee.domain.mission.dao;

import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.mission.entity.Mission;
import io.ssafy.gatee.domain.mission.entity.QMission;
import io.ssafy.gatee.domain.mission.entity.Type;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class MissionRepositoryCustomImpl implements MissionRepositoryCustom {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public List<Mission> findByMemberListAndType(List<Member> memberList, Type type) {

        QMission mission = QMission.mission;

        return jpqlQueryFactory.selectFrom(mission)
                .where(mission.member.in(memberList))
                .where(mission.type.eq(type))
                .orderBy(mission.nowRange.asc())
                .limit(1)
                .fetch();
    }
}
