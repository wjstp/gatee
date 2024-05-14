package io.ssafy.gatee.domain.chat_room.dao;

import io.ssafy.gatee.domain.chat_room.entity.ChatRoom;
import io.ssafy.gatee.domain.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    ChatRoom findByFamily(Family family);
}
