package io.ssafy.gatee.domain.feature.dto.response;

import io.ssafy.gatee.domain.feature.entity.Feature;
import lombok.Builder;

@Builder
public record FeatureRes(
        Long featureId,
        String question
) {
    public static FeatureRes toDto(Feature feature) {
        return FeatureRes.builder()
                .featureId(feature.getId())
                .question(feature.getQuestion())
                .build();
    }
}
