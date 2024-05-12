package io.ssafy.gatee.domain.feature.application;

import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;
import io.ssafy.gatee.domain.feature.dto.response.FeatureRes;
import io.ssafy.gatee.domain.feature.dto.response.FeatureResultRes;

import java.util.List;
import java.util.UUID;

public interface FeatureService {

    void saveFeature(UUID memberId, FeatureReq featureReq);

    List<FeatureRes> readFeatureQuestions(UUID memberId);

    List<FeatureResultRes> readFeatureResults(UUID memberId);

    void updateFeature(UUID memberId, FeatureReq featureReq);

    List<String> getWrongAnswersFromGPT(String question, String answer);
}
