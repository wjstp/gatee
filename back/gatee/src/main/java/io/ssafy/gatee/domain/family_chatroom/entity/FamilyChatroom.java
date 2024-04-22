package io.ssafy.gatee.domain.family_chatroom.entity;

import io.ssafy.gatee.domain.chatroom.entity.ChatRoom;
import io.ssafy.gatee.domain.family.entity.Family;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FamilyChatroom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "family_id")
    private Family family;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
