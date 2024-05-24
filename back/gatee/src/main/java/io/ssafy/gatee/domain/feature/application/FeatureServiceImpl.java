package io.ssafy.gatee.domain.feature.application;


import io.ssafy.gatee.domain.chatgpt.dto.request.QuestionDto;
import io.ssafy.gatee.domain.chatgpt.dto.response.GptResponseDto;
import io.ssafy.gatee.domain.chatgpt.service.GptService;
import io.ssafy.gatee.domain.feature.dao.FeatureRepository;
import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;
import io.ssafy.gatee.domain.feature.dto.response.FeatureRes;
import io.ssafy.gatee.domain.feature.dto.response.FeatureResultRes;
import io.ssafy.gatee.domain.feature.entity.Feature;
import io.ssafy.gatee.domain.feature.entity.Type;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.member_feature.dao.MemberFeatureRepository;
import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFeatureNotFoundException;
import io.ssafy.gatee.global.exception.message.ExceptionMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeatureServiceImpl implements FeatureService {

    private final GptService gptService;
    private final MemberRepository memberRepository;
    private final FeatureRepository featureRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final MemberFeatureRepository memberFeatureRepository;

    @Override
    @Transactional
    public void saveFeature(UUID memberId, FeatureReq featureReq) {
        Member member = memberRepository.getReferenceById(memberId);
        Feature feature = featureRepository.getReferenceById(featureReq.featureId());
        String question = featureRepository.findById(featureReq.featureId()).orElseThrow().getQuestion();

        List<String> wrongAnswers = getWrongAnswersFromGPT(question, featureReq.answer());
        memberFeatureRepository.save(MemberFeature.builder()
                .member(member)
                .feature(feature)
                .answer(featureReq.answer())
                .wrongAnswer(wrongAnswers)
                .build());

    }

    @Override
    public List<FeatureRes> readFeatureQuestions(UUID memberId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        MemberFamily memberFamily = memberFamilyRepository.findByMember(proxyMember)
                .orElseThrow(() -> new MemberFamilyNotFoundException(ExceptionMessage.MEMBER_FAMILY_NOT_FOUND));
        List<Feature> featureList = featureRepository.findMyQuestion(Type.getType(memberFamily.getRole()), memberId);
        return featureList.stream().map(FeatureRes::toDto).toList();
    }

    @Override
    public List<FeatureResultRes> readFeatureResults(UUID memberId) {
        List<MemberFeature> memberFeatureList = memberFeatureRepository.findByMember_Id(memberId);
        return memberFeatureList.stream().map(FeatureResultRes::toDto).toList();
    }

    @Override
    public List<FeatureResultRes> readOtherFeatureResults(Long memberFamilyId) {
        List<MemberFeature> memberFeatureList = memberFeatureRepository.findByMemberFamilyId(memberFamilyId);
        return memberFeatureList.stream().map(FeatureResultRes::toDto).toList();
    }

    @Override
    @Transactional
    public void updateFeature(UUID memberId, FeatureReq featureReq) {
        MemberFeature memberFeature = memberFeatureRepository.findByMember_IdAndFeature_Id(memberId, featureReq.featureId())
                .orElseThrow(() -> new MemberFeatureNotFoundException(ExceptionMessage.MEMBER_FEATURE_NOT_FOUND));
        List<String> wrongAnswers = getWrongAnswersFromGPT(memberFeature.getFeature().getQuestion(), featureReq.answer());

        memberFeature.editMemberFeature(featureReq.answer(), wrongAnswers);
    }

    @Override
    public List<String> getWrongAnswersFromGPT(String question, String answer) {
        String content = "\"" + question + "\"라는 질문에 대해 \"" + answer + "\"라는 답변을 했고, 이를 바탕으로 객관식 문제로 낼 거야. " +
                "이 객관식 문제를 낼 때 선지에 있을 만한 예시 3개를 만들어줘\n" +
                "객관식 문제를 낼 떄 선지에 있을만한 예시의 조건 9가지를 모두 충족해야한다.\n" +
                "1. 답변과 비슷한 길이의 단어나 문장\n" +
                "2. 답변과 같은 범주의 단어나 문장\n" +
                "3. 답변과 시제(과거, 현재)가 일치\n" +
                "4. \"" + question + "\"라는 질문에 대한 답으로 어색하지 않음\n" +
                "5. 의미상 어색하지 않은 단어나 문장\n" +
                "6. 예시에 질문은 포함되지 않음\n" +
                "7. 하나의 단어나 문장\n" +
                "8. 답변과 의미가 다름\n" +
                "9. 따옴표를 예시 양끝에 붙이지 말 것\n" +
                "10. 예시끼리 내용이 겹치지 않음\n" +
                "이 예시 3개를 string type으로 해서 하나의 파이썬 리스트에 이 예시들이 담긴 형태로 만들어줘.\n" +
                "미사여구 없이 리스트 한개만 보여줘.\n" +
                "[\"answer1\", \"answer2\", \"answer3\"] 의 형식으로 보내줘. 따옴표가 중간에 반드시 있어야해.\n" +
                "answer1, answer2, answer3 은 서로 겹치면 안돼. 답변이 answer1, answer2, answer3에 있어서도 안돼.\n" +
                "파이썬 리스트는 단 하나만 보내줘";

        GptResponseDto result = gptService.askQuestion(QuestionDto.builder().content(content).build());
        // 파싱
        log.info(question);
        log.info(result);
        // 응답이 배열 형태로 왔을 떄만 wronganswers 저장
        if (result.answer().startsWith("[") && result.answer().endsWith("]")) {
            String wrongAnswer = result.answer().substring(1, result.answer().length() - 1)
                    .replaceAll("\"", "")
                    .replaceAll("\"", "");
            List<String> wrongAnswers = Arrays.asList(wrongAnswer.split(", "));
            if (wrongAnswers.size() == 3) {
                return wrongAnswers;
            }
        }
        return null;
    }
}
