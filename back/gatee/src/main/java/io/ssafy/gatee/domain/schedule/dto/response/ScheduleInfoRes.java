package io.ssafy.gatee.domain.schedule.dto.response;

import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import io.ssafy.gatee.domain.schedule_record.dto.response.ScheduleRecordRes;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record ScheduleInfoRes(
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
        String endDate,

        ScheduleRecordRes scheduleRecordRes,

        List<ParticipateMemberRes> participateMembers
) {
    public static ScheduleInfoRes toDto(
            Schedule schedule,
            List<Member> memberList,
            ScheduleRecord scheduleRecord,
            List<File> fileList
    ) {
        return ScheduleInfoRes.builder()
                .scheduleId(schedule.getId())
                .category(String.valueOf(schedule.getCategory()))
                .title(schedule.getTitle())
                .emoji(schedule.getEmoji())
                .content(schedule.getContent())
                .startDate(String.valueOf(schedule.getStartDate()))
                .endDate(String.valueOf(schedule.getEndDate()))
                .scheduleRecordRes(ScheduleRecordRes.toDto(scheduleRecord, fileList))
                .participateMembers(memberList.stream().map(ParticipateMemberRes::toDto).toList())
                .build();
    }
}
