package io.ssafy.gatee.domain.member.dto.response;

import io.ssafy.gatee.domain.member.entity.Member;
import lombok.Builder;

import java.util.UUID;

@Builder
public record MemberDetailRes(
        UUID memberId,
        String name,
        String email,
        String nickname,
        String birth,
        String birthType,
        String mood
) {
    public static MemberDetailRes toDto(Member member) {
        return MemberDetailRes.builder()
                .memberId(member.getId())
                .name(member.getName())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .birth(String.valueOf(member.getBirth()))
                .birthType(String.valueOf(member.getBirthType()))
                .mood(member.getMood())
                .build();
    }
}
