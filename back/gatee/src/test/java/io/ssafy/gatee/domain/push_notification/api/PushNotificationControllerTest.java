package io.ssafy.gatee.domain.push_notification.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.domain.push_notification.dto.request.NotificationAgreementReq;
import io.ssafy.gatee.domain.push_notification.dto.response.NaggingRes;
import io.ssafy.gatee.domain.push_notification.dto.response.NotificationAgreementRes;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.UUID;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@ActiveProfiles({"common, prod"})
@WebMvcTest({PushNotificationController.class})
@MockBean(JpaMetamodelMappingContext.class)
class PushNotificationControllerTest extends RestDocsTestSupport {

    @MockBean
    private PushNotificationService pushNotificationService;

    @Test
    @CustomWithMockUser
    void sendNagging() throws Exception {

        // given
        given(pushNotificationService.sendNagging(any(NaggingReq.class), any(UUID.class)))
                .willReturn(NaggingRes.builder()
                        .naggingMessage("잔소리 내용")
                        .build());

        // when
        ResultActions result = mockMvc.perform(post("/api/notifications/nagging")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/push_notification/sendNagging.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("receiverId").description("알림 받는 멤버 ID").optional(),
                                parameterWithName("message").description("내용").optional()
                        ),
                        responseFields(
                                fieldWithPath("naggingMessage").type(JsonFieldType.STRING).description("잔소리 내용")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void readNotificationAgreements() throws Exception {

        // given
        given(pushNotificationService.readNotificationAgreements(any(UUID.class)))
                .willReturn(NotificationAgreementRes.builder()
                        .albumNotification(true)
                        .naggingNotification(false)
                        .scheduleNotification(false)
                        .featureNotification(true).build());

        // when
        ResultActions result = mockMvc.perform(get("/api/notifications/agreements"));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                                responseFields(
                                        fieldWithPath("albumNotification").type(JsonFieldType.BOOLEAN).description("앨범 등록시 알림 동의 여부"),
                                        fieldWithPath("scheduleNotification").type(JsonFieldType.BOOLEAN).description("일정 등록시 알림 동의 여부"),
                                        fieldWithPath("naggingNotification").type(JsonFieldType.BOOLEAN).description("한마디 하기 알림 동의 여부"),
                                        fieldWithPath("featureNotification").type(JsonFieldType.BOOLEAN).description("가족 특징 알림 동의 여부"))
                        )
                );
    }

    @Test
    @CustomWithMockUser
    void modifyNotificationAgreements() throws Exception {

        // given
        doNothing().when(pushNotificationService).modifyNotificationAgreements(any(UUID.class), any(NotificationAgreementReq.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/notifications/agreements")
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/push_notification/modifyNotificationAgreements.json"))
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("albumNotification").description("앨범 등록시 알림 동의 여부").optional(),
                                parameterWithName("naggingNotification").description("한마디 하기 알림 동의 여부").optional(),
                                parameterWithName("scheduleNotification").description("일정 등록시 알림 동의 여부").optional(),
                                parameterWithName("featureNotification").description("가족 특징 알림 동의 여부").optional()
                        )
                ));
    }
}