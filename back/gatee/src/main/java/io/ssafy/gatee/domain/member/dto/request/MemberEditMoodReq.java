package io.ssafy.gatee.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MemberEditMoodReq(

        @NotNull
        String mood
) {
}
