package io.ssafy.gatee.domain.chat_room_file.dao;

import io.ssafy.gatee.domain.chat_room.entity.ChatRoom;
import io.ssafy.gatee.domain.chat_room_file.entity.ChatRoomFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRoomFileRepository extends JpaRepository<ChatRoomFile, Long> {
    List<ChatRoomFile> findAllByChatRoom(ChatRoom chatRoom);
}
