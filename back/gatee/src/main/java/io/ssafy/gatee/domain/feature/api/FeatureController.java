package io.ssafy.gatee.domain.feature.api;

import io.ssafy.gatee.domain.feature.application.FeatureService;
import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/features")
public class FeatureController {

    private final FeatureService featureService;

    // 질문 답변 시 문제 생성
    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void readFeatureQuestion(
            @RequestBody FeatureReq featureReq,
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        featureService.saveFeature(customUserDetails.getMemberId(), featureReq);
    }
}
