package io.ssafy.gatee.global.websocket.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.global.redis.dao.OnlineRoomMemberRepository;
import io.ssafy.gatee.global.redis.dto.OnlineRoomMember;
import io.ssafy.gatee.global.websocket.application.ChatService;
import io.ssafy.gatee.global.websocket.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;

import static io.ssafy.gatee.global.websocket.dto.MessageType.*;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketHandler extends TextWebSocketHandler {

    private final ObjectMapper objectMapper;
    private final ChatService chatService;
    private final FamilyService familyService;
    private final OnlineRoomMemberRepository onlineRoomMemberRepository;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        // 클라이언트에서 서버로 보내는 메세지 형식 수신
        UUID memberId = UUID.fromString(session.getPrincipal().getName());
        ChatDto chatDto = objectMapper.readValue(message.getPayload(), ChatDto.class);

        if (chatDto.messageType().equals(MESSAGE)) {
            chatService.sendMessage(chatDto, memberId);
        }

        if (chatDto.messageType().equals(APPOINTMENT)) {
            log.info("약속 전송!");
            chatService.createAppointment(chatDto, memberId);
        }

        if (chatDto.messageType().equals(EMOJI)) {
            log.info("이모지 전송");
            chatService.sendEmozi(chatDto, memberId);
        }

        if (chatDto.messageType().equals(FILE)) {
            log.info("사진 전송");
            chatService.sendImages(chatDto, memberId);
        }
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        UUID memberId = UUID.fromString(session.getPrincipal().getName());
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);

        // redis에 chattingRoompk를 인덱스로 online user 관리, online user에 넣기
        OnlineRoomMember onlineRoomMember = onlineRoomMemberRepository.findById(familyId)
                .map(orm -> {
                    orm.setOnlineUsers(Optional.ofNullable(orm.getOnlineUsers()).orElseGet(HashSet::new));
                    return orm;
                })
                .orElseGet(() -> OnlineRoomMember.builder()
                        .id(familyId)
                        .onlineUsers(new HashSet<>())
                        .build());
        // 온라인 유저로 관리
        onlineRoomMember.getOnlineUsers().add(memberId);
        onlineRoomMemberRepository.save(onlineRoomMember);
        // 안읽었던 메세지들 읽기
        chatService.updateRead(memberId, familyId);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 회원
        UUID memberId = UUID.fromString(session.getPrincipal().getName());
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        OnlineRoomMember onlineRoomMember = onlineRoomMemberRepository.findById(familyId)
                .map(orm -> {
                    orm.setOnlineUsers(Optional.ofNullable(orm.getOnlineUsers()).orElseGet(HashSet::new));
                    return orm;
                })
                .orElseGet(() -> OnlineRoomMember.builder()
                        .id(familyId)
                        .onlineUsers(new HashSet<>())
                        .build());
        onlineRoomMember.getOnlineUsers().remove(memberId);
        onlineRoomMemberRepository.save(onlineRoomMember);
    }
}
