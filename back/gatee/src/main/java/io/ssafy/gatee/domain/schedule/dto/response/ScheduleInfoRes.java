package io.ssafy.gatee.domain.schedule.dto.response;

import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family_schedule.entity.MemberFamilySchedule;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
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

        ScheduleRecord scheduleRecord,

        List<ParticipateMemberRes> participateMembers
) {
    public static ScheduleInfoRes toDto(Schedule schedule, List<Member> memberList) {
        return ScheduleInfoRes.builder()
                .scheduleId(schedule.getId())
                .category(String.valueOf(schedule.getCategory()))
                .title(schedule.getTitle())
                .emoji(schedule.getEmoji())
                .content(schedule.getContent())
                .startDate(String.valueOf(schedule.getStartDate()))
                .endDate(String.valueOf(schedule.getEndDate()))
                .scheduleRecord(schedule.getScheduleRecord())
                .participateMembers(memberList.stream().map(ParticipateMemberRes::toDto).toList())
                .build();
    }
}
