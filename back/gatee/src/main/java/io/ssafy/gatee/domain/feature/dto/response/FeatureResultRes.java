package io.ssafy.gatee.domain.feature.dto.response;

import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import lombok.Builder;

@Builder
public record FeatureResultRes(
        Long featureId,
        String question,
        String answer
) {
    public static FeatureResultRes toDto(MemberFeature memberFeature) {
        return FeatureResultRes.builder()
                .featureId(memberFeature.getFeature().getId())
                .answer(memberFeature.getAnswer())
                .question(memberFeature.getFeature().getQuestion())
                .build();
    }
}
