package io.ssafy.gatee.domain.schedule_record.dto.response;

import io.ssafy.gatee.domain.photo.entity.Photo;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record ScheduleRecordPhotoRes(

        @NotNull
        Long photoId,

        @NotNull
        String imageUrl
) {
    public static ScheduleRecordPhotoRes toDto(Photo photo) {
        return ScheduleRecordPhotoRes.builder()
                .photoId(photo.getId())
                .imageUrl(photo.getFile().getUrl())
                .build();
    }
}
