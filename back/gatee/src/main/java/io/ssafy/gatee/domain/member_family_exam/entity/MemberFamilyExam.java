package io.ssafy.gatee.domain.member_family_exam.entity;

import io.ssafy.gatee.domain.base.BaseEntity;
import io.ssafy.gatee.domain.exam.entity.Exam;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLRestriction;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@SQLRestriction("status=TRUE")
public class MemberFamilyExam extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_family_id")
    private MemberFamily memberFamily;

    @ManyToOne
    @JoinColumn(name = "exam_id")
    private Exam exam;

    private String question;

    @ElementCollection
    private List<String> answerList;

    private Integer choiceNumber;

    private Integer correctNumber;
}
