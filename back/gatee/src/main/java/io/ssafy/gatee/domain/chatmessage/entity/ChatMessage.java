package io.ssafy.gatee.domain.chatmessage.entity;

import io.ssafy.gatee.domain.chatroom.entity.ChatRoom;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.member.entity.Member;
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
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    @Enumerated(EnumType.STRING)
    private Type type;

    private String content;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @OneToOne(mappedBy = "file_id", cascade = CascadeType.ALL)
    private File file;
}
