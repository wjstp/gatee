package io.ssafy.gatee.domain.schedule.dto.response;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record ScheduleListRes(

        @NotNull
        List<ScheduleListInfoRes> personalScheduleList,

        @NotNull
        List<ScheduleListInfoRes> groupScheduleList
) {
}
