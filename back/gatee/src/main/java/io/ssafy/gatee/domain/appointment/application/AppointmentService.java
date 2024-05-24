package io.ssafy.gatee.domain.appointment.application;

import io.ssafy.gatee.domain.appointment.dto.JoinMembersDto;
import io.ssafy.gatee.global.websocket.dto.ChatDto;

import java.util.UUID;

public interface AppointmentService {
    
    Long createAppointment(ChatDto chatDto, UUID familyId, UUID memberId);

    JoinMembersDto getJoinMemberInAppointment(Long appointmentId);

    void joinAppointment(UUID memberId, Long appointmentId);
}
