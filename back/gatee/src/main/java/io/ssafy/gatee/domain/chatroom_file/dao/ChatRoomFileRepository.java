package io.ssafy.gatee.domain.chatroom_file.dao;

import io.ssafy.gatee.domain.chatroom_file.entity.ChatRoomFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomFileRepository extends JpaRepository<ChatRoomFile, Long> {

}
