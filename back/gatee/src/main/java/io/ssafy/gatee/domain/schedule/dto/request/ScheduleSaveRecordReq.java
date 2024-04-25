package io.ssafy.gatee.domain.schedule.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record ScheduleSaveRecordReq(

        UUID memberId,

        @NotNull
        List<Long> fileIdList,

        @NotNull
        String content
) {
}
