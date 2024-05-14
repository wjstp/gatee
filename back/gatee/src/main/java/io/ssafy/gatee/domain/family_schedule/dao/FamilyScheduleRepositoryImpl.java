package io.ssafy.gatee.domain.family_schedule.dao;

import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.family_schedule.entity.QFamilySchedule;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class FamilyScheduleRepositoryImpl implements FamilyScheduleRepositoryCustom {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public List<ScheduleListRes> getAllScheduleList(Family family) {
        QFamilySchedule familySchedule = QFamilySchedule.familySchedule;

        return jpqlQueryFactory.select(familySchedule.schedule)
                .from(familySchedule)
                .where(familySchedule.family.eq(family))
                .where(familySchedule.schedule.createdAt.in(
                        JPAExpressions.select(familySchedule.schedule.createdAt.min())
                                .from(familySchedule)
                                .groupBy(familySchedule.createdAt.year(), familySchedule.createdAt.month())
                ))
                .orderBy(familySchedule.schedule.createdAt.desc())
                .fetch().stream().map(ScheduleListRes::toDto)
                .toList();
    }
}
