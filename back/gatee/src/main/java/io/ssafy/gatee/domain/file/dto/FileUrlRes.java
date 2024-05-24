package io.ssafy.gatee.domain.file.dto;

import io.ssafy.gatee.domain.file.entity.File;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

@Builder
public record FileUrlRes(

        @NotNull
        Long fileId,

        @NotNull
        String imageUrl
) {
    public static FileUrlRes toDto(File file) {
        return FileUrlRes.builder()
                .fileId(file.getId())
                .imageUrl(file.getUrl())
                .build();
    }
}
