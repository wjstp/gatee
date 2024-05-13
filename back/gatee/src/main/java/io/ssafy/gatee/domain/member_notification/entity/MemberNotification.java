package io.ssafy.gatee.domain.member_notification.entity;

import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.push_notification.dto.request.NotificationAgreementReq;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("status=TRUE")
public class MemberNotification extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private boolean albumNotification;

    private boolean naggingNotification;

    private boolean scheduleNotification;

    private boolean featureNotification;


    @PrePersist
    public void prePersist() {
        this.albumNotification = true;
        this.scheduleNotification = true;
        this.naggingNotification = true;
        this.featureNotification = true;
    }

    public void modifyMemberNotification(NotificationAgreementReq notificationAgreementReq) {
        this.albumNotification = notificationAgreementReq.albumNotification();
        this.scheduleNotification = notificationAgreementReq.scheduleNotification();
        this.naggingNotification = notificationAgreementReq.naggingNotification();
        this.featureNotification = notificationAgreementReq.featureNotification();
    }
}