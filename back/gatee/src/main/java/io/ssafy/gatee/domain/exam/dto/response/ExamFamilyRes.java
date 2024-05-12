package io.ssafy.gatee.domain.exam.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record ExamFamilyRes(
        String nickname,
        UUID memberId,
        double averageScore
) {
}
