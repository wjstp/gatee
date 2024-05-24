package io.ssafy.gatee.global.batch.scheduler;

import io.ssafy.gatee.global.websocket.application.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.JobParametersBuilder;
import org.springframework.batch.core.JobParametersInvalidException;
import org.springframework.batch.core.configuration.JobRegistry;
import org.springframework.batch.core.launch.JobLauncher;
import org.springframework.batch.core.launch.NoSuchJobException;
import org.springframework.batch.core.repository.JobExecutionAlreadyRunningException;
import org.springframework.batch.core.repository.JobInstanceAlreadyCompleteException;
import org.springframework.batch.core.repository.JobRestartException;
import org.springframework.context.annotation.Profile;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Log4j2
@Component
@Profile("batch")
@RequiredArgsConstructor
public class BatchScheduler {

    private final JobLauncher jobLauncher;
    private final JobRegistry jobRegistry;
    private final ChatService chatService;

    @Scheduled(cron = "0 20 10 * * *")  // 매일 아침 10시 20분
    public void runFeatureNotificationJob() {
        String time = LocalDateTime.now().toString();
        try {
            Job job = jobRegistry.getJob("FeatureNotificationJob");
            JobParametersBuilder jobParameter = new JobParametersBuilder().addString("time", time);
            jobLauncher.run(job, jobParameter.toJobParameters());
        } catch (NoSuchJobException | JobRestartException | JobParametersInvalidException |
                 JobInstanceAlreadyCompleteException | JobExecutionAlreadyRunningException e) {
            throw new RuntimeException(e);
        }
    }

    @Scheduled(cron = "0 15 1 ? * *")   // 새벽 1시 15분마다 매일
    public void runFcmTokenRefreshJob() {
        String time = LocalDateTime.now().toString();
        try {
            Job job = jobRegistry.getJob("FcmTokenRefreshJob");
            JobParametersBuilder jobParameter = new JobParametersBuilder().addString("time", time);
            jobLauncher.run(job, jobParameter.toJobParameters());
        } catch (NoSuchJobException | JobRestartException | JobParametersInvalidException |
                 JobInstanceAlreadyCompleteException | JobExecutionAlreadyRunningException e) {
            throw new RuntimeException(e);
        }
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void runTimeLineToChatRoomJob() {
        log.info("batch start!!");
        chatService.sendDateLineToAll();
    }

    @Scheduled(cron = "0 * * * * *")
    public void runTestJob() {
        String time = LocalDateTime.now().toString();
        log.info("batch test : " + time);
    }
}
