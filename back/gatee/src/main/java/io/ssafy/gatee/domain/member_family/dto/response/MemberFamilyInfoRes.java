package io.ssafy.gatee.domain.member_family.dto.response;

import io.ssafy.gatee.domain.member.dto.response.MemberDetailRes;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import lombok.Builder;

@Builder
public record MemberFamilyInfoRes(
        MemberDetailRes member,
        String role,
        boolean isLeader,
        Integer score
) {
    public static MemberFamilyInfoRes toDto(MemberFamily memberFamily) {
        return MemberFamilyInfoRes.builder()
                .member(MemberDetailRes.toDto(memberFamily.getMember()))
                .role(String.valueOf(memberFamily.getRole()))
                .isLeader(memberFamily.isLeader())
                .score(memberFamily.getScore())
                .build();
    }
}
