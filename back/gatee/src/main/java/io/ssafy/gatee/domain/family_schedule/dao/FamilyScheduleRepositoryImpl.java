package io.ssafy.gatee.domain.family_schedule.dao;

import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.family_schedule.entity.QFamilySchedule;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class FamilyScheduleRepositoryImpl implements FamilyScheduleRepositoryCustom {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public List<Schedule> getAllScheduleList(Family family, Integer month) {
        QFamilySchedule familySchedule = QFamilySchedule.familySchedule;

        List<Schedule> scheduleList = jpqlQueryFactory.select(familySchedule.schedule)
                .from(familySchedule)
                .where(familySchedule.family.eq(family))
                .where(familySchedule.schedule.startDate.month().eq(month).or(familySchedule.schedule.endDate.month().eq(month)))
                .orderBy(familySchedule.schedule.createdAt.desc())
                .fetch();

        if (scheduleList.isEmpty()) {
            return new ArrayList<>();
        } else {
            return scheduleList;
        }
    }
}
