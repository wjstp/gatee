package io.ssafy.gatee.domain.exam.api;

import io.ssafy.gatee.domain.exam.application.ExamService;
import io.ssafy.gatee.domain.exam.dto.response.ExamRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

        // 백문백답 질문조회
    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public ExamRes readFeatureQuestion(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return examService.readExam(customUserDetails.getMemberId());
    }

}
