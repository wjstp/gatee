package io.ssafy.gatee.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MemberSaveReq(

        @NotNull
        String name,
        @NotNull
        String nickname,
        @NotNull
        String birth,
        @NotNull
        String birthType,
        @NotNull
        String role,
        @NotNull
        String familyId,
        String phoneNumber
) {
}
