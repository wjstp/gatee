package io.ssafy.gatee.global.websocket.dto;

import lombok.Builder;

import java.util.List;

@Builder
public record FireStoreChatDto(
        MessageType messageType,
        String content,
        String sender,
        Integer totalMember,
        List<String> unReadMember
) {
}
