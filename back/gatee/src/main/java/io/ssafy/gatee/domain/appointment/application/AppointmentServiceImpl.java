package io.ssafy.gatee.domain.appointment.application;

import io.ssafy.gatee.domain.appointment.dao.AppointmentRepository;
import io.ssafy.gatee.domain.appointment.dto.JoinMembersDto;
import io.ssafy.gatee.domain.appointment.entity.Appointment;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.global.batch.scheduler.AppointmentScheduler;
import io.ssafy.gatee.global.exception.error.bad_request.AppointmentNotFoundException;
import io.ssafy.gatee.global.websocket.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.APPOINTMENT_NOT_FOUNT;
import static java.util.stream.Collectors.toSet;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AppointmentServiceImpl implements AppointmentService {

    private final AppointmentRepository appointmentRepository;
    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final FamilyService familyService;
    private final AppointmentScheduler appointmentScheduler;

    @Override
    @Transactional
    public Long createAppointment(ChatDto chatDto, UUID familyId, UUID memberId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        Family proxyFamily = familyRepository.getReferenceById(familyId);
        Appointment appointment = Appointment.builder()
                .title(chatDto.content())
                .family(proxyFamily)
                .joinMembers(Set.of(proxyMember))
                .build();
        appointmentScheduler.registerAppointment(memberId.toString(), appointment.getId(), appointment.getCreatedAt());
        return appointmentRepository.save(appointment).getId();
    }

    @Override
    public JoinMembersDto getJoinMemberInAppointment(Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new AppointmentNotFoundException(APPOINTMENT_NOT_FOUNT));
        return JoinMembersDto.builder()
                .joinMemberIds(appointment
                        .getJoinMembers()
                        .stream()
                        .map(Member::getId)
                        .collect(toSet()))
                .build();
    }

    @Override
    @Transactional
    public void joinAppointment(UUID memberId, Long appointmentId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new AppointmentNotFoundException(APPOINTMENT_NOT_FOUNT));
        appointment.addJoinMember(proxyMember);
    }
}
