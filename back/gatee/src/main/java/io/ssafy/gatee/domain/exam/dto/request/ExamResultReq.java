package io.ssafy.gatee.domain.exam.dto.request;

import java.util.List;

public record ExamResultReq(
        String question,

        List<String> answerList,

        Integer choiceNumber,

        Integer correctNumber
) {
}
