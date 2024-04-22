package io.ssafy.gatee.domain.member_character.entity;

import io.ssafy.gatee.domain.character.entity.Character;
import io.ssafy.gatee.domain.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberCharacter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "character_id")
    private Character character;

    private String answer;

    @ElementCollection
    private List<String> wrongAnswer;
}
