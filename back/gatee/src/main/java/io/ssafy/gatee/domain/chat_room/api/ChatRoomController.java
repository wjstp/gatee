package io.ssafy.gatee.domain.chat_room.api;


import io.ssafy.gatee.domain.chat_room.application.ChatRoomService;
import io.ssafy.gatee.domain.chat_room.dto.request.ChatRoomSaveReq;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatroom")
@RequiredArgsConstructor
@Slf4j
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    // 채팅 사진 전체 조회
    @GetMapping("/{chatroomId}")
    @ResponseStatus(HttpStatus.OK)
    public List<FileUrlRes> readFileListChatRoom(
            @PathVariable("chatroomId") Long chatroomId
    ) {
        return chatRoomService.readFileListChatRoom(chatroomId);
    }

    // 채팅 사진 등록
    @PostMapping("/{chatroomId}")
    @ResponseStatus(HttpStatus.OK)
    public void saveFileListChatRoom(
            @Valid @RequestBody ChatRoomSaveReq chatRoomSaveReq,
            @PathVariable("chatroomId") Long chatroomId
    ) {
        chatRoomService.saveFileListChatRoom(chatroomId, chatRoomSaveReq);
    }
}
