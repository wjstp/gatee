package io.ssafy.gatee.domain.member.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MemberEditProfileImageRes(

        @NotNull
        String imageUrl
) {
}
