package io.ssafy.gatee.domain.member.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.member.application.MemberService;
import io.ssafy.gatee.domain.member.dto.request.*;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Slf4j
@ActiveProfiles({"common, prod"})
@WebMvcTest({MemberController.class})
@MockBean(JpaMetamodelMappingContext.class)
class MemberControllerTest extends RestDocsTestSupport {

    @MockBean
    private MemberService memberService;


    @Test
    @CustomWithMockUser(role = "ANONYMOUS")
    void saveInfo() throws Exception {

        // given
        doNothing().when(memberService).saveMemberInfo(any(MemberSaveReq.class), any(UUID.class), any(HttpServletResponse.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/member/saveInfo.json"))
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("name").description("회원 이름(실명)").optional(),
                                parameterWithName("nickname").description("별명").optional(),
                                parameterWithName("birth").description("생년월일").optional(),
                                parameterWithName("birthType").description("양력 / 음력").optional(),
                                parameterWithName("role").description("가족 내 역할").optional(),
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("phoneNumber").description("전화번호").optional()
                                )
                ));
    }


    @Test
    @CustomWithMockUser
    void saveNotificationToken() throws Exception {

        // given
        doNothing().when(memberService).saveNotificationToken(any(MemberTokenReq.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/members/notifications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/member/saveNotificationToken.json"))
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("notificationToken").description("FCM 토큰").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void editInfo() throws Exception {

        // given
        doNothing().when(memberService).editMemberInfo(any(MemberEditReq.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/members/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/member/editInfo.json"))
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("name").description("회원 이름(실명)").optional(),
                                parameterWithName("nickname").description("별명").optional(),
                                parameterWithName("birth").description("생년월일").optional(),
                                parameterWithName("birthType").description("양력 / 음력").optional(),
                                parameterWithName("role").description("가족 내 역할").optional(),
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("phoneNumber").description("전화번호").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void editMood() throws Exception {

        // given
        doNothing().when(memberService).editMood(any(MemberEditMoodReq.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/members/moods")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/member/editMood.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("mood").description("기분 상태").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void readInfo() throws Exception {

        // given
        given(memberService.readMemberInfo(any(UUID.class)))
                .willReturn(MemberInfoRes.builder()
                        .memberId(UUID.randomUUID())
                        .familyId(UUID.randomUUID())
                        .name("test1")
                        .email("test1@gmail.com")
                        .nickname("test1")
                        .birth("2000-07-20")
                        .birthType("SOLAR")
                        .mood("happy")
                        .role("FATHER")
                        .build());

        // when
        ResultActions result = mockMvc.perform(get("/api/members"));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        responseFields(
                                fieldWithPath("memberId").type(JsonFieldType.STRING).description("회원 ID"),
                                fieldWithPath("familyId").type(JsonFieldType.STRING).description("가족 ID"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("이름 (실명)"),
                                fieldWithPath("email").type(JsonFieldType.STRING).description("email"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("별명"),
                                fieldWithPath("birth").type(JsonFieldType.STRING).description("생년월일 (yyyy-MM-dd)"),
                                fieldWithPath("birthType").type(JsonFieldType.STRING).description("양력 / 음력"),
                                fieldWithPath("mood").type(JsonFieldType.STRING).description("기분 상태"),
                                fieldWithPath("role").type(JsonFieldType.STRING).description("가족 내 역할")
                        )
                    )
                );
    }
}
