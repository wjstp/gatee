package io.ssafy.gatee.domain.member_family_schedule.dao;

import io.ssafy.gatee.domain.family_schedule.entity.FamilySchedule;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family_schedule.entity.MemberFamilySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberFamilyScheduleRepository extends JpaRepository<MemberFamilySchedule, Long> {
    Optional<MemberFamilySchedule> findByMemberAndFamilySchedule(Member member, FamilySchedule familySchedule);

    Optional<List<MemberFamilySchedule>> findAllByFamilySchedule(FamilySchedule familySchedule);
}
