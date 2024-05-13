package io.ssafy.gatee.domain.chatroom.dao;

import io.ssafy.gatee.domain.chatroom.entity.ChatRoom;
import io.ssafy.gatee.domain.family.entity.Family;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    ChatRoom findByFamily(Family family);
}
