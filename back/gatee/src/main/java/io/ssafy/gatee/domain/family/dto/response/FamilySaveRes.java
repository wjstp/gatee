package io.ssafy.gatee.domain.family.dto.response;

import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.UUID;

@Builder
public record FamilySaveRes(

        @NotNull
        UUID familyId,

        @NotNull
        FileUrlRes fileUrl
) {
}
