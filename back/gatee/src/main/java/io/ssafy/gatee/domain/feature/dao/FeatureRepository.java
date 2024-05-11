package io.ssafy.gatee.domain.feature.dao;

import io.ssafy.gatee.domain.feature.entity.Feature;
import io.ssafy.gatee.domain.feature.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.UUID;

@Repository
public interface FeatureRepository extends JpaRepository<Feature, Long > {

    @Query("""
    select f from Feature f
    where f.type = :type or f.type = 'ALL'
    """)
    List<Feature> findMyQuestion(Type type);
}
