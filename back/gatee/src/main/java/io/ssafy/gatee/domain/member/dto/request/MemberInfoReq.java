package io.ssafy.gatee.domain.member.dto.request;

import lombok.Builder;

@Builder
public record MemberInfoReq(
        String memberId,

        String name,
        String email,

        String nickname,

        String birth,

        String birthType,

        String mood,

        String role,

        String privilege
) {
}
