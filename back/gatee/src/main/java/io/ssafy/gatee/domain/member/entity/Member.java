package io.ssafy.gatee.domain.member.entity;


import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.member.dto.request.MemberInfoReq;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.SQLRestriction;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("status=TRUE")
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    private UUID id;

    private String name;

    private String email;

    private String nickname;

    private Date birth;

    private BirthType birthType;

    private String mood;

    // 1:1 관계에서 자식 entity의 pk를 가지고 있는 부모 entity에 적용하는 어노테이션
    // mappedBy에 부모 클래스를 작성하여 이 관계의 주인을 나타냄
    @ManyToOne
    @JoinColumn(name = "file_id")
    private File file;

    @Enumerated(EnumType.STRING)
    private Privilege privilege;

    public void saveInfo(MemberInfoReq memberInfoReq) throws ParseException {

        if(Objects.nonNull(memberInfoReq.name())) {
            this.name = memberInfoReq.name();
        }
        if(Objects.nonNull(memberInfoReq.email())) {
            this.email = memberInfoReq.email();
        }
        if(Objects.nonNull(memberInfoReq.nickname())) {
            this.nickname = memberInfoReq.nickname();
        }
        if(Objects.nonNull(memberInfoReq.birth())) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            this.birth = sdf.parse(memberInfoReq.birth());
        }
        if(Objects.nonNull(memberInfoReq.birthType())) {
            this.birthType = BirthType.valueOf(memberInfoReq.birthType());
        }
        if(Objects.nonNull(memberInfoReq.mood())) {
            this.mood = memberInfoReq.mood();
        }
        if(Objects.nonNull(memberInfoReq.privilege())) {
            this.privilege = Privilege.valueOf(memberInfoReq.privilege());
        }
    }
}
