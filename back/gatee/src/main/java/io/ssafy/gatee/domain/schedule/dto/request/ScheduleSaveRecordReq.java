package io.ssafy.gatee.domain.schedule.dto.request;

import lombok.Builder;

@Builder
public record ScheduleSaveRecordReq(
        String content
) {
}
