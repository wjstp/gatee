package io.ssafy.gatee.domain.appointment.api;

import io.ssafy.gatee.domain.appointment.application.AppointmentService;
import io.ssafy.gatee.domain.appointment.dto.JoinMembersDto;
import io.ssafy.gatee.global.security.application.AuthorizeService;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/appointments")
@RequiredArgsConstructor
public class AppointmentController {

    private final AppointmentService appointmentService;
    private final AuthorizeService authorizeService;

    @ResponseStatus(HttpStatus.OK)
    @GetMapping("/{appointmentId}")
    @PreAuthorize("@authorizeService.authorizeToReadAppointment(#principal.getMemberId, #appointmentId)")
    public JoinMembersDto getJoinMemberInAppointment(
            @PathVariable Long appointmentId,
            @AuthenticationPrincipal CustomUserDetails principal) {
        return appointmentService.getJoinMemberInAppointment(appointmentId);
    }
}
