package io.ssafy.gatee.domain.appointment.entity;

import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.chatroom.entity.ChatRoom;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;
import org.joda.time.DateTime;
import org.joda.time.LocalDateTime;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("status=TRUE")
public class Appointment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private LocalDateTime createAt;

    @OneToOne
    @JoinColumn(name = "family_id")
    private Family family;

    @ManyToMany
    @JoinTable(
            name = "appointment_members",
            joinColumns = @JoinColumn(name = "appointment_id"),
            inverseJoinColumns = @JoinColumn(name = "member_id")
    )
    private Set<Member> joinMembers;

    public boolean isCreatedByTargetFamily(UUID familyId) {
        return family.getId().equals(familyId);
    }

    public void addJoinMember(Member proxyMember) {
        this.joinMembers.add(proxyMember);
    }
}
