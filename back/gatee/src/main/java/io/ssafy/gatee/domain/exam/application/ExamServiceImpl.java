package io.ssafy.gatee.domain.exam.application;

import io.ssafy.gatee.domain.exam.dto.response.ExamQuestionRes;
import io.ssafy.gatee.domain.exam.dto.response.ExamRes;
import io.ssafy.gatee.domain.feature.dao.FeatureRepository;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_feature.dao.MemberFeatureRepository;
import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ExamServiceImpl implements ExamService{

    private final FeatureRepository featureRepository;
    private final MemberFeatureRepository memberFeatureRepository;
    private final MemberFamilyRepository memberFamilyRepository;

    @Override
    public ExamRes readExam(UUID memberId) {
        // memberId랑 같은 가족인 사람들 뽑고, 그 사람들 기준으로 memberFeature random id로 조회
        List<UUID> familyMemberIdExcludeMe = memberFamilyRepository.findMyFamily(memberId);

        List<MemberFeature> randomFeature = memberFeatureRepository.findRandomMemberFeature(familyMemberIdExcludeMe, 4L);
        randomFeature.stream().map(feature -> {
                List<String> answerList = new ArrayList<>();
                // 문제 섞어서....

                });

//                ExamQuestionRes.builder()
//                .question(feature.getMember().getName() + "의 " + feature.getFeature().getMainPoint()+"은?")
//                .answerList(feature.getWrongAnswer())
//                .correctNumber()}
//                                                    .build());
        return null;
    }
}
