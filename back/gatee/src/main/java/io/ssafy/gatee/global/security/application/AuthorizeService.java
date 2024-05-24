package io.ssafy.gatee.global.security.application;

import io.ssafy.gatee.domain.appointment.dao.AppointmentRepository;
import io.ssafy.gatee.domain.appointment.entity.Appointment;
import io.ssafy.gatee.domain.family.application.FamilyService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthorizeService {

    private final FamilyService familyService;
    private final AppointmentRepository appointmentRepository;

    public boolean authorizeToReadAppointment(UUID memberId, Long appointmentId) {
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        Appointment proxyAppointment = appointmentRepository.getReferenceById(appointmentId);
        return proxyAppointment.isCreatedByTargetFamily(familyId);
    }
}
