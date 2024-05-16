package io.ssafy.gatee.domain.mission.entity;

import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.mission.dto.request.MissionTypeReq;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

@Entity  // Database 등록 선언
@Getter  // Get Method 생성
@Builder  // Builder Pattern 으로 객체 생성
@NoArgsConstructor  // 변수 없이 생성자 선언
@AllArgsConstructor  // 변수를 모두 넣어서 생성자 선언
@SQLRestriction("status=TRUE")
public class Mission extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)  // Enum 타입 일 경우 선언
    private Type type;

    private boolean isComplete;

    private Integer nowRange;

    private Integer maxRange;

    private Integer completedLevel;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public void increaseRange(MissionTypeReq missionTypeReq) {
        this.nowRange++;

        if (missionTypeReq.type().equals(Type.ALBUM)) {
            this.nowRange += missionTypeReq.photoCount() - 1;

            if (this.nowRange >= (this.completedLevel + 1) * 10) {
                this.isComplete = true;
            }
        } else if (missionTypeReq.type().equals(Type.FEATURE)) {
            if (this.nowRange >= (this.completedLevel + 1) * 10) {
                this.isComplete = true;
            }
        } else if (missionTypeReq.type().equals(Type.EXAM)) {
            if (this.nowRange == (2 * this.completedLevel + 1)) {
                this.isComplete = true;
            }
        } else if (missionTypeReq.type().equals(Type.SCHEDULE)) {
            if (this.nowRange == (int) Math.pow(2, this.completedLevel)) {
                this.isComplete = true;
            }
        }
    }

    public void doComplete() {
        this.completedLevel++;
        this.isComplete = false;

        if (this.type.equals(Type.ALBUM)) {
            this.maxRange += 10;

        } else if (this.type.equals(Type.FEATURE)) {
            this.maxRange += 10;

        } else if (this.type.equals(Type.EXAM)) {
            this.maxRange += 2;

        } else if (this.type.equals(Type.SCHEDULE)) {
            this.maxRange = (int) Math.pow(2, this.completedLevel);

        }

        if (this.nowRange >= this.maxRange) {
            this.isComplete = true;
        }
    }
}
