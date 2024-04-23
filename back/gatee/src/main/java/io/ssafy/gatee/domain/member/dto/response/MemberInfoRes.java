package io.ssafy.gatee.domain.member.dto.response;

import io.ssafy.gatee.domain.member.entity.BirthType;
import lombok.Builder;

import java.util.UUID;

@Builder
public record MemberInfoRes(
        UUID memberId,
        String name,
        String email,
        String nickname,
        String birth,
        String birthType,

        String mood,
        String role
) {
}
