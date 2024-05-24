package io.ssafy.gatee.domain.member_family_schedule.dao;

import io.ssafy.gatee.domain.family_schedule.entity.FamilySchedule;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family_schedule.entity.MemberFamilySchedule;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberFamilyScheduleRepository extends JpaRepository<MemberFamilySchedule, Long> {

    Optional<MemberFamilySchedule> findByMemberAndFamilySchedule(Member member, FamilySchedule familySchedule);

    Optional<List<MemberFamilySchedule>> findAllByFamilySchedule(FamilySchedule familySchedule);

    @Query("""
            select ms.member.id from MemberFamilySchedule ms
            join FamilySchedule fs on fs.id = ms.familySchedule.id
            where fs.schedule = :schedule
            """)
    List<UUID> findMemberIdBySchedule(Schedule schedule);

    Boolean existsByMemberAndFamilySchedule(Member member, FamilySchedule familySchedule);
}
