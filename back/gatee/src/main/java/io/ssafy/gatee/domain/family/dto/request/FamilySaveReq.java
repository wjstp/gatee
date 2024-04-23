package io.ssafy.gatee.domain.family.dto.request;

import java.util.UUID;

public record FamilySaveReq(
        String memberId,
        String name
) {
}
