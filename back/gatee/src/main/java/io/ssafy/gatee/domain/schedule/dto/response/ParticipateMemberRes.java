package io.ssafy.gatee.domain.schedule.dto.response;

import io.ssafy.gatee.domain.member.entity.Member;
import lombok.Builder;

@Builder
public record ParticipateMemberRes(

        String nickname,

        String profileImageUrl
) {

    public static ParticipateMemberRes toDto(Member member) {
        return ParticipateMemberRes.builder()
                .nickname(member.getNickname())
                .profileImageUrl(member.getFile().getUrl())
                .build();
    }
}
