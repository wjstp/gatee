package io.ssafy.gatee.domain.member.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record MemberInfoRes(
        UUID memberId,
        Long memberFamilyId,
        UUID familyId,
        String name,
        String email,
        String nickname,
        String birth,
        String birthType,
        String mood,
        String role,
        String profileImageUrl,
        String phoneNumber
) {
}
