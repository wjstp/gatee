package io.ssafy.gatee.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MemberEditMoodReq(
        String memberId,

        @NotNull
        String mood
) {
}
