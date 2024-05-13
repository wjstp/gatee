package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.domain.appointment.dao.AppointmentRepository;
import io.ssafy.gatee.domain.appointment.entity.Appointment;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthorizeService {

    private MemberRepository memberRepository;
    private FamilyRepository familyRepository;
    private FamilyService familyService;
    private AppointmentRepository appointmentRepository;

    public boolean authorizeToReadAppointment(UUID memberId, Long appointmentId) {
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        Appointment proxyAppointment = appointmentRepository.getReferenceById(appointmentId);
        return proxyAppointment.isCreatedByTargetFamily(familyId);
    }
}
