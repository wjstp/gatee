package io.ssafy.gatee.domain.member_feature.dao;

import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface MemberFeatureRepository extends JpaRepository<MemberFeature, Long> {

    @Query(value = """
        select mf from MemberFeature mf
        where mf.member.id in :memberIdList
        and size(mf.wrongAnswer) = 3
        order by rand()
        """)
    List<MemberFeature> findRandomMemberFeature(@Param("memberIdList") List<UUID> memberIdList, Pageable pageable);

    List<MemberFeature> findByMember_Id(UUID memberId);

    @Query("""
        select f from MemberFeature f
        join MemberFamily mf
        on mf.member.id = f.member.id
        where mf.id = :memberFamilyId
    """)
    List<MemberFeature> findByMemberFamilyId(Long memberFamilyId);

    Optional<MemberFeature> findByMember_IdAndFeature_Id(UUID memberId, Long featureId);
}
