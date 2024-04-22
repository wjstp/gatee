package io.ssafy.gatee.domain.member.entity;


import io.ssafy.gatee.domain.file.entity.File;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    private String email;

    private String nickname;

    private Date birth;

    private String mood;

    // 1:1 관계에서 자식 entity의 pk를 가지고 있는 부모 entity에 적용하는 어노테이션
    // mappedBy에 부모 클래스를 작성하여 이 관계의 주인을 나타냄
    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private File file;

    @Enumerated(EnumType.STRING)
    private Privilege privilege;

    private boolean isLunar;
}
