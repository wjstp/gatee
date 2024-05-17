package io.ssafy.gatee.domain.appointment.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.appointment.application.AppointmentService;
import io.ssafy.gatee.domain.appointment.dto.JoinMembersDto;
import io.ssafy.gatee.global.security.application.AuthorizeService;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@ActiveProfiles("test")
@WebMvcTest({AppointmentController.class})
@MockBean(JpaMetamodelMappingContext.class)
class AppointmentControllerTest extends RestDocsTestSupport {

    @MockBean
    private AppointmentService appointmentService;

    @MockBean
    private AuthorizeService authorizeService;

    @Test
    @CustomWithMockUser
    void getJoinMemberInAppointment() throws Exception {

        // given
        Set<UUID> joinMemberIds = new HashSet<>();

        joinMemberIds.add(UUID.randomUUID());

        given(appointmentService.getJoinMemberInAppointment(any(Long.class)))
                .willReturn(JoinMembersDto.builder()
                        .joinMemberIds(joinMemberIds)
                        .build());

        // when
        ResultActions result = mockMvc.perform(get("/api/appointments/{appointmentId}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("appointmentId").description("약속 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("joinMemberIds").type(JsonFieldType.ARRAY).description("참여 멤버 ID")
                )));

    }

    @Test
    @CustomWithMockUser
    void joinAppointment() throws Exception {

        // given
        doNothing().when(appointmentService).joinAppointment(any(UUID.class), any(Long.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/appointments/{appointmentId}", 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("appointmentId").description("약속 ID").optional()
                        )
                ));
    }
}