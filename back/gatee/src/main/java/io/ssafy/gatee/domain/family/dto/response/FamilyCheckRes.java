package io.ssafy.gatee.domain.family.dto.response;

import lombok.Builder;

import java.util.UUID;

@Builder
public record FamilyCheckRes(
        String familyId,
        String familyName
) {
}
