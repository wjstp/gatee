package io.ssafy.gatee.global.batch.config;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_feature.dao.MemberFeatureRepository;
import io.ssafy.gatee.domain.member_feature.entity.MemberFeature;
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
import org.springframework.context.annotation.Profile;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Log4j2
@Configuration
@Profile("batch")
@RequiredArgsConstructor
public class FeatureNotificationBatchConfig {
    private final int CHUNK_SIZE = 1000;
    private final String JOB_NAME = "FeatureNotificationJob";
    private final EntityManagerFactory entityManagerFactory;
    private final PushNotificationService pushNotificationService;
    private final MemberFeatureRepository memberFeatureRepository;

    @Bean
    public Job featureNotificationJob(JobRepository jobRepository, PlatformTransactionManager transactionManager) throws Exception {
        return new JobBuilder(JOB_NAME, jobRepository)
                .start(this.sendFeatureNotificationStep(jobRepository, transactionManager))
                .build();
    }

    @Bean(JOB_NAME + "_notificationStep")
    public Step sendFeatureNotificationStep(JobRepository jobRepository, PlatformTransactionManager platformTransactionManager) throws Exception {
        return new StepBuilder("notificationStep", jobRepository)
                .<Member, Member>chunk(CHUNK_SIZE, platformTransactionManager)
                .reader(loadMemberData())
                .processor(checkMemberAgreement())
                .writer(sendNotification())
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
        return members -> members.forEach(member -> {
            Optional<MemberFeature> randomMemberFeature = memberFeatureRepository.findRandomMyFamilyFeature(member.getId());
            if (randomMemberFeature.isPresent()) {
                log.info(randomMemberFeature.get().getFeature() + ", " + member.getName());
                FeatureNotificationDTO.builder()
                        .question(randomMemberFeature.get().getFeature().getQuestion())
                        .answer(randomMemberFeature.get().getAnswer());
                try {
                    pushNotificationService.sendPushOneToOne(PushNotificationFCMReq.builder()
                            .title(Type.FEATURE.korean)
                            .receiverId(List.of(member.getId()))
                            .content(randomMemberFeature.get().getMember().getNickname()
                                    + randomMemberFeature.get().getFeature().getMainPoint()
                                    + "\n"
                                    + randomMemberFeature.get().getAnswer())
                            .dataFCMReq(DataFCMReq.builder().type(Type.FEATURE).typeId(0L).build())
                            .build());
                } catch (FirebaseMessagingException e) {
                    throw new RuntimeException(e);
                }
            }
        });
    }
}
