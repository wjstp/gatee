package io.ssafy.gatee.domain.push_notification.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumSaveRes;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.NaggingReq;
import io.ssafy.gatee.domain.push_notification.dto.request.NotificationAgreementReq;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationCheckReq;
import io.ssafy.gatee.domain.push_notification.dto.response.NaggingRes;
import io.ssafy.gatee.domain.push_notification.dto.response.NotificationAgreementRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationPageRes;
import io.ssafy.gatee.domain.push_notification.dto.response.PushNotificationRes;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.UUID;
import java.util.List;

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
    void readNotifications() throws Exception {

        PushNotificationRes pushNotificationRes1 = PushNotificationRes.builder()
                .notificationId("6641b46b93237768ce9b546d")
                .title("제목")
                .content("알림 내용")
                .createdAt("알림 발송 시간")
                .isCheck(false)
                .senderId(UUID.randomUUID().toString())
                .senderImageUrl("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/1b90ac50-c277-4994-81ba-75118b35f5ba_profile_oldwoman.PNG")
                .type("ALBUM")
                .typeId(1L)
                .build();
        PushNotificationRes pushNotificationRes2 = PushNotificationRes.builder()
                .notificationId("6641b46b93237768ce9b546d")
                .title("제목")
                .content("알림 내용")
                .createdAt("알림 발송 시간")
                .isCheck(false)
                .senderId(UUID.randomUUID().toString())
                .senderImageUrl("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/1b90ac50-c277-4994-81ba-75118b35f5ba_profile_oldwoman.PNG")
                .type("ALBUM")
                .typeId(1L)
                .build();
        PushNotificationPageRes pushNotificationPageRes = PushNotificationPageRes.builder()
                .pushNotificationResList(List.of(pushNotificationRes1, pushNotificationRes2))
                .hasNext(true)
                .nextCursor("6641aaef38f8fa7c0ae57553").build();
        // given
        given(pushNotificationService.readNotifications(any(UUID.class), any(Pageable.class), any(String.class)))
                .willReturn(pushNotificationPageRes);

        // when
        ResultActions result = mockMvc.perform(get("/api/notifications")

                .param("cursor", "6641aaef38f8fa7c0ae57553"));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("cursor").description("조회를 시작할 id")
                        ),
                                responseFields(
                                        fieldWithPath("hasNext").type(JsonFieldType.BOOLEAN).description("다음 페이지가 있는지 없는지"),
                                        fieldWithPath("nextCursor").type(JsonFieldType.STRING).description("다음 커서 (다음 페이지의 첫번째 "),
                                        fieldWithPath("pushNotificationResList").type(JsonFieldType.ARRAY).description("알림 정보 객체 리스트"),
                                        fieldWithPath("pushNotificationResList.[].notificationId").type(JsonFieldType.STRING).description("알림 id"),
                                        fieldWithPath("pushNotificationResList.[].type").type(JsonFieldType.STRING).description("알림의 Type - NAGGING / ALBUM / SCHEDULE"),
                                        fieldWithPath("pushNotificationResList.[].typeId").type(JsonFieldType.NUMBER).description("알림의 Type Id"),
                                        fieldWithPath("pushNotificationResList.[].senderId").type(JsonFieldType.STRING).description("알림을 보낸 사람의 member Id"),
                                        fieldWithPath("pushNotificationResList.[].senderImageUrl").type(JsonFieldType.STRING).description("알림을 보낸 사람의 프로필 이미지 url"),
                                        fieldWithPath("pushNotificationResList.[].title").type(JsonFieldType.STRING).description("알림 제목"),
                                        fieldWithPath("pushNotificationResList.[].content").type(JsonFieldType.STRING).description("알림 내용"),
                                        fieldWithPath("pushNotificationResList.[].isCheck").type(JsonFieldType.BOOLEAN).description("알림 확인 여부"),
                                        fieldWithPath("pushNotificationResList.[].createdAt").type(JsonFieldType.STRING).description("알림 생성시간")

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
                        .chatNotification(true)
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
                                        fieldWithPath("chatNotification").type(JsonFieldType.BOOLEAN).description("채팅 알림 동의 여부"),
                                        fieldWithPath("featureNotification").type(JsonFieldType.BOOLEAN).description("가족 특징 알림 동의 여부"))
                        )
                );
    }

    @Test
    @CustomWithMockUser
    void checkReadNotification() throws Exception {

        // given
        doNothing().when(pushNotificationService).checkReadNotification(any(String.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/notifications/check")
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/push_notification/checkReadNotification.json"))
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("notificationId").description("알림 ID").optional()
                )));

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
                                parameterWithName("chatNotification").description("채팅 알림 동의 여부").optional(),
                                parameterWithName("featureNotification").description("가족 특징 알림 동의 여부").optional()
                        )
                ));
    }
}