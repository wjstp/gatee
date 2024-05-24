package io.ssafy.gatee.domain.feature.api;

import io.ssafy.gatee.domain.feature.application.FeatureService;
import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;
import io.ssafy.gatee.domain.feature.dto.response.FeatureRes;
import io.ssafy.gatee.domain.feature.dto.response.FeatureResultRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/features")
public class FeatureController {

    private final FeatureService featureService;

    // 질문 조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<FeatureRes> readFeatureQuestions(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return featureService.readFeatureQuestions(customUserDetails.getMemberId());
    }

    // 질문 및 답변 조회
    @GetMapping("/results")
    @ResponseStatus(HttpStatus.OK)
    public List<FeatureResultRes> readFeatureResults(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return featureService.readFeatureResults(customUserDetails.getMemberId());
    }

    // 질문 및 답변 조회
    @GetMapping("/{memberFamilyId}/results")
    @ResponseStatus(HttpStatus.OK)
    public List<FeatureResultRes> readOtherFeatureResults(@PathVariable("memberFamilyId") Long memberFamilyId) {
        return featureService.readOtherFeatureResults(memberFamilyId);
    }

    // 질문 답변 시 문제 생성
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveFeature(
            @RequestBody FeatureReq featureReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        featureService.saveFeature(customUserDetails.getMemberId(), featureReq);
    }

    // 답변 수정
    @PatchMapping
    @ResponseStatus(HttpStatus.OK)
    public void updateFeature(
            @RequestBody FeatureReq featureReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        featureService.updateFeature(customUserDetails.getMemberId(), featureReq);
    }


}
