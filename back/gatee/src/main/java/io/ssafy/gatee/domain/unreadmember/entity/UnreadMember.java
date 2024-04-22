package io.ssafy.gatee.domain.unreadmember.entity;

import io.ssafy.gatee.domain.chatmessage.entity.ChatMessage;
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
public class UnreadMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "chat_message_id")
    private ChatMessage chatMessage;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
