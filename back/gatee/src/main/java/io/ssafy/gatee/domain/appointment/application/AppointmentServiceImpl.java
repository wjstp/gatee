package io.ssafy.gatee.domain.appointment.application;

import io.ssafy.gatee.domain.appointment.dao.AppointmentRepository;
import io.ssafy.gatee.domain.appointment.entity.Appointment;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.global.websocket.dto.ChatDto;
import lombok.RequiredArgsConstructor;
import org.joda.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AppointmentServiceImpl implements AppointmentService{

    private final AppointmentRepository appointmentRepository;
    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;

    @Override
    @Transactional
    public Long createAppointment(ChatDto chatDto, UUID familyId, UUID memberId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        Family proxyFamily = familyRepository.getReferenceById(familyId);
        Appointment appointment = Appointment.builder()
                .title(chatDto.content())
                .createAt(LocalDateTime.now())
                .family(proxyFamily)
                .joinMembers(Set.of(proxyMember))
                .build();
        return appointmentRepository.save(appointment).getId();
    }
}
