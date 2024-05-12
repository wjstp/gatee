package io.ssafy.gatee.domain.photo.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;
import java.util.UUID;

@Builder
public record PhotoListDeleteReq(

        @NotNull
        List<Long> photoIdList
) {
}
