package io.ssafy.gatee.domain.exam.dto.response;

import lombok.Builder;

@Builder
public record ExamSaveRes(
        Long examId
) {
}
