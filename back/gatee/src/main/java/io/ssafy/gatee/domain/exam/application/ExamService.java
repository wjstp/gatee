package io.ssafy.gatee.domain.exam.application;

import io.ssafy.gatee.domain.exam.dto.request.ExamReq;
import io.ssafy.gatee.domain.exam.dto.response.*;

import java.util.List;
import java.util.UUID;

public interface ExamService {

    List<ExamRes> readExam(UUID memberId);

    ExamSaveRes saveExamResult(ExamReq examReq, UUID memberId);

    List<ExamResultRes> readExamResults(UUID memberId);

    ExamDetailRes readExamResultDetail(Long examId);

    List<ExamFamilyRes> readFamilyExamResults(UUID memberId);
}
