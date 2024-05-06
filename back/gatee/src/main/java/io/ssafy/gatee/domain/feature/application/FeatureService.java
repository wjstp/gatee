package io.ssafy.gatee.domain.feature.application;

import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;

import java.util.UUID;

public interface FeatureService {
    void saveFeature(UUID memberId, FeatureReq featureReq);
}
