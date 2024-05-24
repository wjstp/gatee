package io.ssafy.gatee.domain.exam.application;

import io.ssafy.gatee.domain.exam.dao.ExamRepository;
import io.ssafy.gatee.domain.exam.dto.request.ExamReq;
import io.ssafy.gatee.domain.exam.dto.response.*;
import io.ssafy.gatee.domain.exam.entity.Exam;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.member_family_exam.dao.MemberFamilyExamRepository;
import io.ssafy.gatee.domain.member_family_exam.entity.MemberFamilyExam;
import io.ssafy.gatee.domain.member_feature.dao.MemberFeatureRepository;
import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ExamServiceImpl implements ExamService {

    private final MemberRepository memberRepository;
    private final MemberFeatureRepository memberFeatureRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final ExamRepository examRepository;
    private final MemberFamilyExamRepository memberFamilyExamRepository;

    @Override
    public List<ExamRes> readExam(UUID memberId) {
        List<UUID> familyMemberIdExcludeMe = memberFamilyRepository.findMyFamily(memberId);

        List<MemberFeature> randomFeature = memberFeatureRepository.findRandomMemberFeature(familyMemberIdExcludeMe, PageRequest.of(0, 10));

        return randomFeature.stream().map(memberFeature -> ExamRes.builder()
                .nickname(memberFeature.getMember().getNickname())
                .questionWord(memberFeature.getFeature().getMainPoint())
                .correctAnswer(memberFeature.getAnswer())
                .wrongAnswers(memberFeature.getWrongAnswer())
                .build()).toList();
    }

    @Override
    public List<ExamResultRes> readExamResults(UUID memberId) {
        List<Exam> exams = examRepository.findByMemberId(memberId);
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (!exams.isEmpty()) {
            return exams.stream().map(exam -> ExamResultRes
                    .builder()
                    .examId(exam.getId())
                    .createdAt(dateTimeFormatter.format(exam.getCreatedAt()))
                    .score(exam.getScore()).build()).toList();
        }
        return new ArrayList<>();
    }

    @Override
    public List<ExamResultRes> readOtherExamResults(Long memberFamilyId) {
        List<Exam> exams = examRepository.findByMemberFamilyId(memberFamilyId);
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        if (!exams.isEmpty()) {
            return exams.stream().map(exam -> ExamResultRes
                    .builder()
                    .examId(exam.getId())
                    .createdAt(dateTimeFormatter.format(exam.getCreatedAt()))
                    .score(exam.getScore()).build()).toList();
        }
        return new ArrayList<>();
    }

    @Override
    public ExamDetailRes readExamResultDetail(Long examId) {
        Exam exam = examRepository.getReferenceById(examId);
        List<MemberFamilyExam> memberFamilyExams = memberFamilyExamRepository.findByExam_Id(examId);
        return ExamDetailRes.builder()
                .score(exam.getScore())
                .examData(memberFamilyExams.stream().map(ExamDetailListRes::toDto).toList()).build();
    }

    @Override
    public List<ExamFamilyRes> readFamilyExamResults(UUID memberId) {
        return memberFamilyExamRepository.findFamilyExamResults(memberId);
    }


    @Override
    @Transactional
    public ExamSaveRes saveExamResult(ExamReq examReq, UUID memberId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        MemberFamily memberFamily = memberFamilyRepository.findByMember(proxyMember)
                .orElseThrow(() -> new MemberFamilyNotFoundException(ExceptionMessage.MEMBER_FAMILY_NOT_FOUND));
        Exam exam = examRepository.save(Exam.builder().score(examReq.score()).build());
        List<MemberFamilyExam> memberFamilyExams = examReq.examResults().stream().map(examResult -> MemberFamilyExam.builder()
                .exam(exam)
                .memberFamily(memberFamily)
                .question(examResult.question())
                .answerList(examResult.answerList())
                .choiceNumber(examResult.choiceNumber())
                .correctNumber(examResult.correctNumber()).build()).toList();
        memberFamilyExamRepository.saveAll(memberFamilyExams);
        return ExamSaveRes.builder().examId(exam.getId()).build();
    }
}
