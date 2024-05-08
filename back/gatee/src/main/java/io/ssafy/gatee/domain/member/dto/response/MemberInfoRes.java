package io.ssafy.gatee.domain.member.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record MemberInfoRes(
        UUID memberId,
        UUID familyId,
        String name,
        String email,
        String nickname,
        String birth,
        String birthType,
        String mood,
        String role
) {
}
