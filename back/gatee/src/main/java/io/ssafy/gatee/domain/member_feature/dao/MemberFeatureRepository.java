package io.ssafy.gatee.domain.member_feature.dao;

import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MemberFeatureRepository extends JpaRepository<MemberFeature, Long> {

    @Query(value = """
        select mf from MemberFeature mf
        where mf.member.id in :memberIdList
        order by rand()
        limit :questionQuantity
        """, nativeQuery = true)
    List<MemberFeature> findRandomMemberFeature(@Param("memberIdList") List<UUID> memberIdList, @Param("questionQuantity") Long questionQuantity);

}
