package io.ssafy.gatee.domain.member_notification.entity;

import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.notification.entity.Notification;
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
public class MemberNotification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "from_member_id")
    private Member fromMember;

    @ManyToOne
    @JoinColumn(name = "to_member_id")
    private Member toMember;

    @ManyToOne
    @JoinColumn(name = "notification_id")
    private Notification notification;
}
