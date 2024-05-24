package io.ssafy.gatee.domain.schedule.dto.request;

import io.ssafy.gatee.domain.schedule.entity.Category;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ScheduleEditReq(

        @NotNull
        String familyId,

        @NotNull
        Category category,

        @NotNull
        String title,

        @NotNull
        String emoji,

        @NotNull
        String content,

        @NotNull
        String startDate,

        @NotNull
        String endDate
) {
}
