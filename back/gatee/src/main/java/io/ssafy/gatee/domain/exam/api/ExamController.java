package io.ssafy.gatee.domain.exam.api;

import io.ssafy.gatee.domain.exam.application.ExamService;
import io.ssafy.gatee.domain.exam.dto.request.ExamReq;
import io.ssafy.gatee.domain.exam.dto.response.*;
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

    @GetMapping("/results/family")
    @ResponseStatus(HttpStatus.OK)
    public List<ExamFamilyRes> readFamilyExamResults(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return examService.readFamilyExamResults(customUserDetails.getMemberId());
    }

    @GetMapping("/results")
    @ResponseStatus(HttpStatus.OK)
    public List<ExamResultRes> readExamResults(
            @AuthenticationPrincipal CustomUserDetails customUserDetails
    ) {
        return examService.readExamResults(customUserDetails.getMemberId());
    }

    @GetMapping("/results/details")
    @ResponseStatus(HttpStatus.OK)
    public ExamDetailRes readExamResultDetails(
            @RequestParam("examId") Long examId
    ) {
        return examService.readExamResultDetail(examId);
    }

    @GetMapping("/{memberFamilyId}/results")
    @ResponseStatus(HttpStatus.OK)
    public List<ExamResultRes> readOtherExamResults(
            @PathVariable("memberFamilyId") Long memberFamilyId
    ) {
        return examService.readOtherExamResults(memberFamilyId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public ExamSaveRes saveExamResult(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @RequestBody ExamReq examReq
    ) {
        return examService.saveExamResult(examReq, customUserDetails.getMemberId());
    }
}
