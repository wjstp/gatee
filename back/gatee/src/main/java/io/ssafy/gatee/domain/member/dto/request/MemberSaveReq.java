package io.ssafy.gatee.domain.member.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record MemberSaveReq (

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

        // file - 회원 프로필 이미지 추가

        @NotNull
        String familyId,

        String phoneNumber
){
}
