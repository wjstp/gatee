package io.ssafy.gatee.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;

public record MemberEditMoodReq(
        String memberId,

        @NotNull
        String mood
) {
}
