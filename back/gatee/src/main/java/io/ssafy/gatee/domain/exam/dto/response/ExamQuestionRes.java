package io.ssafy.gatee.domain.exam.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ExamQuestionRes(
        String question,
        List<String> answerList,
        Long correctNumber
) {
}
