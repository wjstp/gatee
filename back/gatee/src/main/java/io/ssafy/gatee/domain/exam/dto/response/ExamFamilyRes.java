package io.ssafy.gatee.domain.exam.dto.response;

import java.util.UUID;

public record ExamFamilyRes(
        String nickname,
        UUID memberId,
        double averageScore
) {
}
