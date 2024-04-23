package io.ssafy.gatee.domain.member_family_mission.entity;

import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.mission.entity.Mission;
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
public class MemberFamilyMission extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "mission_id")
    private Mission mission;

    @ManyToOne
    @JoinColumn(name = "member_family_id")
    private MemberFamily memberFamily;

    private Integer processCount;

    @PrePersist
    public void prePersist() {
        this.processCount = 1;
    }
}
