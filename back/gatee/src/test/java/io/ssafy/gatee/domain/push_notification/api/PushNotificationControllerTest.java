package io.ssafy.gatee.domain.push_notification.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.domain.push_notification.dto.response.NaggingRes;
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
}