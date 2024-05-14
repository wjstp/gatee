package io.ssafy.gatee.domain.schedule.dto.response;

import io.ssafy.gatee.domain.schedule.entity.Schedule;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ScheduleListRes(

        @NotNull
        Long scheduleId,

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
        public static ScheduleListRes toDto(Schedule schedule) {
                return ScheduleListRes.builder()
                        .scheduleId(schedule.getId())
                        .category(String.valueOf(schedule.getCategory()))
                        .title(schedule.getTitle())
                        .emoji(schedule.getEmoji())
                        .content(schedule.getContent())
                        .startDate(String.valueOf(schedule.getStartDate()))
                        .endDate(String.valueOf(schedule.getEndDate()))
                        .build();
        }
}
