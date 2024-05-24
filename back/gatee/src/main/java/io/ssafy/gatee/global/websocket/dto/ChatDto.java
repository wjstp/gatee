package io.ssafy.gatee.global.websocket.dto;

import java.util.List;

public record ChatDto(
        MessageType messageType,
        String content,
        String emojiId,
        List<String> files,
        String currentTime
) {
}
