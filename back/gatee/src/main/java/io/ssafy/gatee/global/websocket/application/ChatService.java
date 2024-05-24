package io.ssafy.gatee.global.websocket.application;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.global.websocket.dto.ChatDto;
import io.ssafy.gatee.global.websocket.dto.FireStoreChatDto;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

public interface ChatService {

    void sendMessage(ChatDto chatDto, UUID memberId) throws ExecutionException, InterruptedException, FirebaseMessagingException;

    void updateRead(UUID memberId, UUID familyId);

    void createAppointment(ChatDto chatDto, UUID memberId) throws ExecutionException, InterruptedException, FirebaseMessagingException;

    void sendEmozi(ChatDto chatDto, UUID memberId) throws FirebaseMessagingException;

    void sendImages(ChatDto chatDto, UUID memberId) throws FirebaseMessagingException;

    void sendDateLine(FireStoreChatDto fireStoreChatDto, UUID familyId);

    void sendDateLineToAll();
}
