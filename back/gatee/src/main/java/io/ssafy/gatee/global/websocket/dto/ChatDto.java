package io.ssafy.gatee.global.websocket.dto;

import java.util.List;
import java.util.UUID;

public record ChatDto(
    MessageType messageType,
    String content,
    String emojiId,
    List<String> files,
    String currentTime
) {
}
