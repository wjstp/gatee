package io.ssafy.gatee.domain.exam.application;

import io.ssafy.gatee.domain.exam.dto.request.ExamReq;
import io.ssafy.gatee.domain.exam.dto.response.ExamRes;

import java.util.List;
import java.util.UUID;

public interface ExamService {

    List<ExamRes> readExam(UUID memberId);

    void saveExamResult(ExamReq examReq, UUID memberId);
}
