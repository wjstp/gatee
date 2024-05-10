package io.ssafy.gatee.domain.exam.application;

import io.ssafy.gatee.domain.exam.dto.response.ExamRes;

import java.util.UUID;

public interface ExamService {

    ExamRes readExam(UUID memberId);
}
