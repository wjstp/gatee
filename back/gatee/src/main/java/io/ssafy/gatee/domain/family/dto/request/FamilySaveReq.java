package io.ssafy.gatee.domain.family.dto.request;

import io.ssafy.gatee.domain.file.entity.type.FileType;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.springframework.web.multipart.MultipartFile;

@Builder
public record FamilySaveReq(

        @NotNull
        String name,

        @NotNull
        FileType fileType,

        @NotNull
        MultipartFile file
) {
}
