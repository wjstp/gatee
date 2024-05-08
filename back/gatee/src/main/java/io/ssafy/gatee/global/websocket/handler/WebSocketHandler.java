package io.ssafy.gatee.global.websocket.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import io.ssafy.gatee.global.jwt.application.JwtService;
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

import java.security.Principal;
import java.util.HashSet;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.FAMILY_NOT_FOUND;

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
        log.info(message.getPayload());
        ChatDto chatDto = objectMapper.readValue(message.getPayload(), ChatDto.class);
        log.info(chatDto.toString());

        // FireStore에 저장할 Dto로 파싱
        chatService.sendMessage(chatDto);

        // 메세지 발신 완료
        session.sendMessage(new TextMessage("전송 완료"));
    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        log.info("연결 성공");
        UUID memberId = UUID.fromString(session.getPrincipal().getName());
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);

        // redis에 chattingRoompk를 인덱스로 online user 관리, online user에 넣기
        OnlineRoomMember onlineRoomMember = onlineRoomMemberRepository.findById(familyId)
                .orElseThrow(() -> new FamilyNotFoundException(FAMILY_NOT_FOUND));
        if (onlineRoomMember.getOnlineUsers() == null) {
            onlineRoomMember.setOnlineUsers(new HashSet<>());
        }

//        onlineRoomMember.getOnlineUsers().add(memberId);
        onlineRoomMemberRepository.save(onlineRoomMember);
        // 안읽었던 메세지들 읽기
        // family id에서 chattroomid로 교체
        chatService.updateRead(memberId, familyId);
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        // 회원
        log.info("연결 종료");
    }
}
