package io.ssafy.gatee.domain.schedule.dto.response;

import io.ssafy.gatee.domain.member.entity.Member;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ParticipateMemberRes(

        String nickname,

        String email,

        String profileImageUrl
) {

    public static ParticipateMemberRes toDto(Member member) {
        return ParticipateMemberRes.builder()
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileImageUrl(member.getFile().getUrl())
                .build();
    }
}
