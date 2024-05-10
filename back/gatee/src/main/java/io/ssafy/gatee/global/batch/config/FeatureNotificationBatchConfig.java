package io.ssafy.gatee.global.batch.config;


import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_feature.dto.MemberFeatureRepository;
import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
import io.ssafy.gatee.domain.member_notification.dao.MemberNotificationRepository;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.DataFCMReq;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationFCMReq;
import io.ssafy.gatee.domain.push_notification.entity.Type;
import io.ssafy.gatee.global.batch.dto.FeatureNotificationDTO;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemReader;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Log4j2
@Configuration
@RequiredArgsConstructor
public class FeatureNotificationBatchConfig {

    private final int CHUNK_SIZE = 1000;
    private final String JOB_NAME = "featureNotificationJob";
    private final EntityManagerFactory entityManagerFactory;
    private final MemberNotificationRepository memberNotificationRepository;
    private final PushNotificationService pushNotificationService;
    private final MemberFeatureRepository memberFeatureRepository;
    private final MemberFamilyRepository memberFamilyRepository;

    @Bean
    public Job featureNotificationJob(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new JobBuilder(JOB_NAME, jobRepository)
                .start(this.sendFeatureNotificationStep(jobRepository, transactionManager))
                .build();
    }

    @Bean(JOB_NAME + "_notificationStep")
    public Step sendFeatureNotificationStep(JobRepository jobRepository, PlatformTransactionManager platformTransactionManager) {
        return new StepBuilder("notificationStep", jobRepository)
                .chunk(CHUNK_SIZE, platformTransactionManager)
//                .reader(loadMemberData())
//                .writer()
                .build();
    }

    private ItemReader<? extends Member> loadMemberData() throws Exception {
        JpaPagingItemReader<Member> jpaPagingItemReader = new JpaPagingItemReaderBuilder<Member>()
                .name(JOB_NAME + "_loadMemberData")
                .entityManagerFactory(entityManagerFactory)
                .pageSize(CHUNK_SIZE)
                .queryString("select m from Member m")
                .build();
        jpaPagingItemReader.afterPropertiesSet();
        return jpaPagingItemReader;
    }

    private ItemProcessor<? super Member, ? extends Member> checkMemberAgreement() {
        return members -> {
            if (Objects.isNull(members.getNotificationToken())) {
                return null;
            }
            return members;
        };
    }

    private ItemWriter<? super Member> sendNotification() throws FirebaseMessagingException {
        // 가족 특징들 랜덤으로
        // 나랑 같은 가족
        return member -> {
            List<UUID> familyMemberIds = memberFamilyRepository.findMyFamily(member);
            if (familyMemberIds.isEmpty()) {
                return ;
            }
            UUID randomId = familyMemberIds.get((int) (Math.random() * familyMemberIds.size()));
            MemberFeature randomMemberFeature = memberFeatureRepository.findByMember_Id(randomId).orElse(null);
            FeatureNotificationDTO.builder()
                    .question(randomMemberFeature.getFeature().getQuestion())
                    .answer(randomMemberFeature.getAnswer());
            pushNotificationService.sendPushOneToOne(PushNotificationFCMReq.builder()
                    .title(Type.FEATURE.korean)
                    .receiverId(member)
                    .content(randomMemberFeature.getFeature().getQuestion() + "은 " + randomMemberFeature.getAnswer() + "이랍니다?")
                    .dataFCMReq(DataFCMReq.builder().build())
                    .build());
            return member;
        };
    }


}
