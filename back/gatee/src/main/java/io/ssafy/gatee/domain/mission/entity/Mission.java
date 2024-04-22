package io.ssafy.gatee.domain.mission.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity  // Database 등록 선언
@Getter  // Get Method 생성
@Builder  // Builder Pattern 으로 객체 생성
@NoArgsConstructor  // 변수 없이 생성자 선언
@AllArgsConstructor  // 변수를 모두 넣어서 생성자 선언
public class Mission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)  // Enum 타입 일 경우 선언
    private Type type;

    private String name;

    private Integer endCount;
}
