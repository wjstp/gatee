package io.ssafy.gatee.domain.schedule_record.dto.response;

import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record ScheduleRecordRes(

        @NotNull
        Long scheduleRecordId,

        @NotNull
        String profileImageUrl,

        @NotNull
        String nickname,

        @NotNull
        String content,

        @NotNull
        List<ScheduleRecordPhotoRes> scheduleRecordPhotoResList
) {
    public static ScheduleRecordRes toDto(ScheduleRecord scheduleRecord, List<ScheduleRecordPhotoRes> scheduleRecordPhotoResList) {
        return ScheduleRecordRes.builder()
                .scheduleRecordId(scheduleRecord.getId())
                .profileImageUrl(scheduleRecord.getMember().getFile().getUrl())
                .nickname(scheduleRecord.getMember().getNickname())
                .content(scheduleRecord.getContent())
                .scheduleRecordPhotoResList(scheduleRecordPhotoResList)
                .build();
    }
}
