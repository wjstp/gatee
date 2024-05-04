package io.ssafy.gatee.domain.feature.application;


import io.ssafy.gatee.domain.chatgpt.dto.request.QuestionDto;
import io.ssafy.gatee.domain.chatgpt.dto.response.GptResponseDto;
import io.ssafy.gatee.domain.chatgpt.service.GptService;
import io.ssafy.gatee.domain.feature.dao.FeatureRepository;
import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;
import io.ssafy.gatee.domain.feature.entity.Feature;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_feature.dto.MemberFeatureRepository;
import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.UUID;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FeatureServiceImpl implements FeatureService{

    private final GptService gptService;
    private final MemberRepository memberRepository;
    private final FeatureRepository featureRepository;
    private final MemberFeatureRepository memberFeatureRepository;

    @Override
    @Transactional
    public void saveFeature(UUID memberId, FeatureReq featureReq) {
        Member member = memberRepository.getReferenceById(memberId);
        Feature feature = featureRepository.getReferenceById(featureReq.featureId());
        String question = featureRepository.findById(featureReq.featureId()).orElseThrow().getQuestion();
        String content = question + "라는 질문에 대해 \"" + featureReq.answer() + "\"라는 답변이 정답이야." +
                "이를 객관식 문제로 낼 때 선지에 있을 만한 예시 3개를 하나의 Python의 리스트에 담아줘. " +
                "미사 여구 없이 리스트로만 답해 \n" +
                "'객관식 문제에 낼 떄 선지에 있을만한 예시'의 조건은 다음과 같고, 이를 모두 만족해야돼\n" +
                "1. '"+ featureReq.answer() + "'라는 답변이 문장이라면 문장이고, "+ featureReq.answer() + "가 단어라면 단어\n" +
                "2. '" + featureReq.answer() + "와 같은 범주의 단어나 문장\n" +
                "3. '" + featureReq.answer() + "와 비슷한 길이의 단어나 문장\n" +
                "4. " + question + "에 대한 답변으로 어색하지 않은 단어나 문장\n" +
                "5. 문장일 경우 비문이 아니어야 한다.\n" +
                "6. " + featureReq.answer() + "와 같은 의미가 아닌 단어나 문장";

        GptResponseDto result = gptService.askQuestion(QuestionDto.builder().content(content).build());
        // 파싱
        System.out.println(result);
        String answer = result.answer().substring(1, result.answer().length() - 1).replaceAll("\"", "");
        System.out.println(answer);
        List<String> wrongAnswers = Arrays.asList(answer.split(","));
        System.out.println(wrongAnswers);
        memberFeatureRepository.save(MemberFeature.builder()
                        .member(member)
                        .feature(feature)
                        .answer(featureReq.answer())
                        .wrongAnswer(wrongAnswers)
                        .build());

    }
}
