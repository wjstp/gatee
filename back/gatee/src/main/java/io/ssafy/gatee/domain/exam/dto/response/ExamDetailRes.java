package io.ssafy.gatee.domain.exam.dto.response;

import io.ssafy.gatee.domain.member_family_exam.entity.MemberFamilyExam;
import lombok.Builder;

import java.util.List;

@Builder
public record ExamDetailRes(
        String question,

        List<String> answerList,

        Integer choiceNumber,

        Integer correctNumber

) {
    public static ExamDetailRes toDto(MemberFamilyExam memberFamilyExam) {
        return ExamDetailRes.builder()
                .question(memberFamilyExam.getQuestion())
                .answerList(memberFamilyExam.getAnswerList())
                .choiceNumber(memberFamilyExam.getChoiceNumber())
                .correctNumber(memberFamilyExam.getCorrectNumber())
                .build();
    }
}
