package io.ssafy.gatee.domain.member.dto.request;

import io.ssafy.gatee.domain.member.entity.BirthType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MemberInfoReq(
        String memberId,

        @NotNull
        String name,

        @NotNull
        String nickname,

        @NotNull
        String birth,

        @NotNull
        String birthType,

        @NotNull
        String role
) {
}
