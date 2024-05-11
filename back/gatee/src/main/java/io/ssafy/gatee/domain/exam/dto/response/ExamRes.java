package io.ssafy.gatee.domain.exam.dto.response;

import lombok.Builder;

import java.util.List;

@Builder
public record ExamRes(
        String nickname,
        String questionWord,
        List<String> wrongAnswers,
        String correctAnswer
) {
}
