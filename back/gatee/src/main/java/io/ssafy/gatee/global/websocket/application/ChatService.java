package io.ssafy.gatee.global.websocket.application;

import io.ssafy.gatee.global.websocket.dto.ChatDto;

public interface ChatService {
    void sendMessage(ChatDto chatDto);
}
