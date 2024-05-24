package io.ssafy.gatee.domain.member_family.dao;

import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberFamilyRepository extends JpaRepository<MemberFamily, Long> {

    Optional<MemberFamily> findByMemberAndFamilyId(Member member, UUID familyId);

    Optional<MemberFamily> findByMemberAndFamily(Member member, Family family);

    List<MemberFamily> findAllByFamily_Id(UUID familyId);

    Optional<MemberFamily> findByMember(Member member);

    boolean existsByMember_Id(UUID memberId);

    @Query("SELECT mf FROM MemberFamily mf WHERE mf.family = (SELECT m.family FROM MemberFamily m WHERE m.member = :member)")
    Optional<List<MemberFamily>> findAllWithFamilyByMember(Member member);

    Optional<List<MemberFamily>> findAllByFamily(Family family);

    Boolean existsByMember(Member member);

    Integer countMemberFamiliesByFamily(Family family);

    @Query("""
                select  m.member.id from MemberFamily m
                where m.family = (select mf.family from MemberFamily mf where mf.member.id=:memberId)
                and m.member.id != :memberId
            """)
    List<UUID> findMyFamily(@Param("memberId") UUID memberId);
}
