package io.ssafy.gatee.domain.exam.api;

import io.ssafy.gatee.domain.exam.application.ExamService;
import io.ssafy.gatee.domain.exam.dto.request.ExamReq;
import io.ssafy.gatee.domain.exam.dto.response.ExamDetailRes;
import io.ssafy.gatee.domain.exam.dto.response.ExamRes;
import io.ssafy.gatee.domain.exam.dto.response.ExamResultRes;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/exams")
public class ExamController {

    private final ExamService examService;

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    public List<ExamRes> readExam(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return examService.readExam(customUserDetails.getMemberId());
    }

    @GetMapping("/results")
    @ResponseStatus(HttpStatus.OK)
    public List<ExamResultRes> readExamResults(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return examService.readExamResults(customUserDetails.getMemberId());
    }

    @GetMapping("/{exam-id}/results")
    @ResponseStatus(HttpStatus.OK)
    public List<ExamDetailRes> readExamResultDetails(
            @PathVariable("exam-id") Long examId
    ) {
        return examService.readExamResultDetail(examId);
    }


    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void saveExam(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            ExamReq examReq
    ) {
        examService.saveExamResult(examReq, customUserDetails.getMemberId());
    }




}
