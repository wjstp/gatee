package io.ssafy.gatee.domain.member_feature.dto;

import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberFeatureRepository extends JpaRepository<MemberFeature, Long> {
}
