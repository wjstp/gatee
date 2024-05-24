package io.ssafy.gatee.global.websocket.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class FireStoreChatDto {

    private final MessageType messageType;

    private final String content;

    private final String sender;

    private final String emojiId;

    private final List<String> files;

    private final List<String> unReadMember;

    private final String currentTime;

    private final Long appointmentId;
}
