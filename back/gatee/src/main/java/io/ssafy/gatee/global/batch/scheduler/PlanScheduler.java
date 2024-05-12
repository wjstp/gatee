package io.ssafy.gatee.global.batch.scheduler;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.family_schedule.dao.FamilyScheduleRepository;
import io.ssafy.gatee.domain.member_family_schedule.dao.MemberFamilyScheduleRepository;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationFCMReq;
import io.ssafy.gatee.domain.schedule.dao.ScheduleRepository;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ScheduledFuture;


@Log4j2
@Component
@RequiredArgsConstructor
public class PlanScheduler {

    private final ScheduleRepository scheduleRepository;
    private final MemberFamilyScheduleRepository memberFamilyScheduleRepository;
    private final FamilyScheduleRepository familyScheduleRepository;
    @Autowired
    TaskScheduler taskScheduler;
    private final PushNotificationService pushNotificationService;
    private Map<String, ScheduledFuture<?>> scheduledTasks = new HashMap<>();

    public void registerSchedule(UUID memberId, Long scheduleId, LocalDateTime planTime) {
        ScheduledFuture<?> scheduledTask = taskScheduler.schedule(() -> sendPlanNotification(scheduleId),
                Instant.from(planTime.plusMinutes(10)));    // tood: 수정
        scheduledTasks.put(memberId + "_" + scheduleId.toString(), scheduledTask);
    }

    public void deleteSchedule(UUID memberId, Long scheduleId) {
        ScheduledFuture<?> scheduledTask = scheduledTasks.get(memberId + "_" + scheduleId.toString());
        if (Objects.nonNull(scheduledTask)) {
            scheduledTask.cancel(true);
            scheduledTasks.remove(memberId + "_" + scheduleId.toString());
        }
    }

    public void sendPlanNotification(Long scheduleId) throws FirebaseMessagingException {
        //  db에 일정이 변경되진 않았는지, 인원이 변경되진 않았는지, 삭제되진 않았는지 확인 후 알림 발송
        Optional<Schedule> schedule = scheduleRepository.findById(scheduleId);
        if (schedule.isEmpty()) {
            return;
        }
        if (!schedule.get().getEndDate().equals(LocalDateTime.now().minusMinutes(10))) {
            return;
        }
        List<UUID> memberIds = memberFamilyScheduleRepository.findMemberIdBySchedule(schedule.get());
        if (memberIds.isEmpty()) {
            return;
        }

        PushNotificationFCMReq fcmReq = PushNotificationFCMReq.builder()
                .receiverId(memberIds)
                .title("일정 종료 알림")
                .content(schedule.get().getTitle() + "일정이 종료되었어요.")
                .build();

        pushNotificationService.sendPushOneToMany(fcmReq);

    }
}
