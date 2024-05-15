package io.ssafy.gatee.domain.chat_room.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.util.List;

@Builder
public record ChatRoomSaveReq(

        @NotNull
        List<Long> fileIdList
) {
}
