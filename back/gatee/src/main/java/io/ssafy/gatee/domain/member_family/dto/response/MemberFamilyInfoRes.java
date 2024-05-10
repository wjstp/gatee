package io.ssafy.gatee.domain.member_family.dto.response;

import io.ssafy.gatee.domain.member.entity.BirthType;
import io.ssafy.gatee.domain.member_family.entity.Role;
import lombok.Builder;

import java.time.LocalDate;
import java.util.Date;
import java.util.UUID;

@Builder
public record MemberFamilyInfoRes(
        UUID memberId,
        String name,
        String email,
        String nickname,
        LocalDate birth,
        BirthType birthType,
        Boolean isLeader,
        String mood,
        String role,
        String fileUrl
) {
}
