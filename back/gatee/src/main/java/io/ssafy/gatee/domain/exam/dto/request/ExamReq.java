package io.ssafy.gatee.domain.exam.dto.request;

import java.util.List;

public record ExamReq(
        List<ExamResultReq> examResults,
        Integer score
) {
}
