package io.ssafy.gatee.domain.family.dto.response;

import io.ssafy.gatee.domain.member_family.dto.response.MemberFamilyInfoRes;
import lombok.Builder;

import java.util.List;

@Builder
public record FamilyInfoRes(
        String name,
        Integer familyScore,
        String familyImageUrl,
        List<MemberFamilyInfoRes> memberFamilyInfoList
) {
}
