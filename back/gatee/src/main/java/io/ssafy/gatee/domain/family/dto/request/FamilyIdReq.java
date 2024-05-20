package io.ssafy.gatee.domain.family.dto.request;

import lombok.Builder;

@Builder
public record FamilyIdReq(
        String familyId
) {
}
