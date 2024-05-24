package io.ssafy.gatee.global.batch.config;


import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
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

import java.time.LocalDate;
import java.util.Objects;


@Log4j2
@Configuration
@Profile("batch")
@RequiredArgsConstructor
public class FcmTokenRefreshBatchConfig {

    private final int CHUNK_SIZE = 1000;
    private final String JOB_NAME = "FcmTokenRefreshJob";
    private final EntityManagerFactory entityManagerFactory;
    private final MemberRepository memberRepository;

    @Bean
    public Job FcmTokenRefreshJob(JobRepository jobRepository, PlatformTransactionManager transactionManager) throws Exception {
        return new JobBuilder(JOB_NAME, jobRepository)
                .start(this.sendFcmTokenRefreshStep(jobRepository, transactionManager))
                .build();
    }

    @Bean(JOB_NAME + "_checkAndRefreshToken")
    public Step sendFcmTokenRefreshStep(JobRepository jobRepository, PlatformTransactionManager platformTransactionManager) throws Exception {
        return new StepBuilder("checkAndRefreshTokenStep", jobRepository)
                .<Member, Member>chunk(CHUNK_SIZE, platformTransactionManager)
                .reader(loadMemberData())
                .processor(processMemberData())
                .writer(removeOldToken())
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

    private ItemProcessor<? super Member, ? extends Member> processMemberData() {
        return members -> {
            if (Objects.isNull(members.getNotificationToken())) {
                return null;
            }
            if (members.getNotificationTokenSaveTime().plusMonths(1).isAfter(LocalDate.now())) {
                return null;
            }
            return members;
        };
    }

    private ItemWriter<? super Member> removeOldToken() {
        return members -> members.forEach(member -> {
            member.saveNotificationToken("");
            memberRepository.save(member);
        });
    }
}
