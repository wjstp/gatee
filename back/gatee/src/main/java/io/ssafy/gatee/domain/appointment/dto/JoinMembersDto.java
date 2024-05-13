package io.ssafy.gatee.domain.appointment.dto;

import lombok.Builder;

import java.util.Set;
import java.util.UUID;

@Builder
public record JoinMembersDto(
        Set<UUID> joinMemberIds
) {
}
