package io.ssafy.gatee.domain.chat_room.application;

import io.ssafy.gatee.domain.chat_room.dto.request.ChatRoomSaveReq;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;

import java.util.List;

public interface ChatRoomService {

    List<FileUrlRes> readFileListChatRoom(Long chatroomId);

    void saveFileListChatRoom(Long chatroomId, ChatRoomSaveReq chatRoomSaveReq);
}
