package io.ssafy.gatee.domain.schedule.dto.request;

import io.ssafy.gatee.domain.schedule.entity.Category;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;

import java.util.UUID;

@Builder
public record ScheduleSaveReq(
        UUID memberId,

        @NotNull
        String familyId,

        @NotNull
        String category,

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
