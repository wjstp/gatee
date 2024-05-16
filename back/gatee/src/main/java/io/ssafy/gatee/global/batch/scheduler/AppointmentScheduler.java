package io.ssafy.gatee.global.batch.scheduler;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.appointment.dao.AppointmentRepository;
import io.ssafy.gatee.domain.appointment.entity.Appointment;
import io.ssafy.gatee.domain.family_schedule.dao.FamilyScheduleRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family_schedule.dao.MemberFamilyScheduleRepository;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationFCMReq;
import io.ssafy.gatee.domain.schedule.dao.ScheduleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;
import java.util.concurrent.ScheduledFuture;


@Log4j2
@Component
@RequiredArgsConstructor
public class AppointmentScheduler {
    private final ScheduleRepository scheduleRepository;
    private final MemberFamilyScheduleRepository memberFamilyScheduleRepository;
    private final AppointmentRepository appointmentRepository;
    private final FamilyScheduleRepository familyScheduleRepository;
    private final TaskScheduler taskScheduler;
    private final PushNotificationService pushNotificationService;
    private Map<String, ScheduledFuture<?>> scheduledTasks = new HashMap<>();

    public void registerAppointment(String memberId, Long appointmentId, LocalDateTime planTime) {
        ZonedDateTime appointmentTime = planTime.atZone(ZoneId.systemDefault()).plusDays(1).minusHours(1)
                .withZoneSameInstant(ZoneId.of("Asia/Seoul"));
        System.out.println(appointmentTime);
        ScheduledFuture<?> scheduledTask = taskScheduler.schedule(() -> {
                    try {
                        log.info(appointmentId);
                        sendAppointmentNotification(appointmentId);
                    } catch (FirebaseMessagingException e) {
                        throw new RuntimeException(e);
                    }
                },
                Instant.from(appointmentTime.plusDays(1).minusHours(1)));
        scheduledTasks.put(memberId + "_" + appointmentId.toString(), scheduledTask);
    }

    public void deleteAppointment(String memberId, Long scheduleId) {
        ScheduledFuture<?> scheduledTask = scheduledTasks.get(memberId + "_" + scheduleId.toString());
        if (Objects.nonNull(scheduledTask)) {
            scheduledTask.cancel(true);
            scheduledTasks.remove(memberId + "_" + scheduleId.toString());
        }
    }

    public void sendAppointmentNotification(Long appointmentId) throws FirebaseMessagingException {
        //  db에 일정이 변경되진 않았는지, 인원이 변경되진 않았는지, 삭제되진 않았는지 확인 후 알림 발송
        Optional<Appointment> appointment = appointmentRepository.findById(appointmentId);
        if (appointment.isEmpty()) {
            return;
        }
        if (!appointment.get().getCreatedAt().equals(LocalDateTime.now().minusMinutes(10))) {
            return;
        }
        List<UUID> joinMemberIds = appointment.get().getJoinMembers().stream().map(Member::getId).toList();
        if (joinMemberIds.isEmpty()) {
            return;
        }
        System.out.println(appointment.get().getJoinMembers());

        PushNotificationFCMReq fcmReq = PushNotificationFCMReq.builder()
                .receiverId(joinMemberIds)
                .title("일정 종료 알림")
                .content(appointment.get().getTitle() + " 일정이 종료되었어요.")
                .build();

        pushNotificationService.sendPushOneToMany(fcmReq);

    }
}
