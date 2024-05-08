package io.ssafy.gatee.global.websocket.application;

import io.ssafy.gatee.global.websocket.dto.ChatDto;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

public interface ChatService {
    void sendMessage(ChatDto chatDto, UUID memberId) throws ExecutionException, InterruptedException;

    void updateRead(UUID memberId, UUID familyId);
}
