package io.ssafy.gatee.domain.member.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.member.application.MemberService;
import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberReadReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Slf4j
@ActiveProfiles({"common, prod"})
@WebMvcTest({MemberController.class})
@MockBean(JpaMetamodelMappingContext.class)
class MemberControllerTest extends RestDocsTestSupport {

    @MockBean
    private MemberService memberService;


    @Test
    @DisplayName("회원 정보 등록 테스트")
    @CustomWithMockUser(role = "ANONYMOUS")
    void saveInfo() throws Exception {
        mockMvc.perform(post("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/member/saveMember.json")))
                .andDo(document("회원 정보 등록"))
                .andExpect(status().isOk());
    }


    @Test
    @CustomWithMockUser
    @DisplayName("회원 FCM 토큰 저장 테스트")
    void saveNotificationToken() throws Exception {
        mockMvc.perform(patch("/api/members/notifications")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/member/saveNotificationToken.json")))
                .andDo(document("회원 FCM 토큰 저장"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("회원 정보 수정 테스트")
    void editInfo() throws Exception {
        MemberEditReq memberEditReq = MemberEditReq.builder()
                .name("name")
                .nickname("nickname")
                .birth("2001-01-01")
                .birthType("LUNAR")
                .role("MOTHER")
                .familyId("1")
                .build();

        String memberEditJson = objectMapper.writeValueAsString(memberEditReq);

        log.info("context 확인 : " + String.valueOf(SecurityContextHolder.getContext().getAuthentication()));
        mockMvc.perform(patch("/api/members/profile")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(memberEditJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(document("회원 정보 수정"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("기분 상태 수정 테스트")
    void editMood() throws Exception {
        MemberEditMoodReq memberEditMoodReq = MemberEditMoodReq.builder()
                .mood("mood")
                .build();

        String memberEditMoodJson = objectMapper.writeValueAsString(memberEditMoodReq);

        mockMvc.perform(patch("/api/members/moods")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(memberEditMoodJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(document("기분 상태 수정"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    void readInfo() throws Exception {

        given(memberService.readMemberInfo(any(), any()))
                .willReturn(MemberInfoRes.builder()
                        .memberId(UUID.randomUUID())
                        .name("test1")
                        .email("test1@gmail.com")
                        .nickname("test1")
                        .birth("2000-07-20")
                        .birthType("SOLAR")
                        .mood("happy")
                        .role("FATHER")
                        .build());

        MemberReadReq request = MemberReadReq.builder()
                .familyId("1")
                .build();

        String requestJson = objectMapper.writeValueAsString(request);

        ResultActions result = mockMvc.perform(get("/api/members")
                        .contentType(MediaType.APPLICATION_JSON)
//                        .content(readJson("json/member/readInfo.json")))
                        .content(requestJson)
                        .accept(MediaType.APPLICATION_JSON)
        );


//                .andDo(document("회원 정보 조회"))
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        requestFields(
                               fieldWithPath("familyId").description("가족 코드")
                        ),
                        responseFields(
                                fieldWithPath("memberId").type(JsonFieldType.STRING).description("memberId"),
                                fieldWithPath("name").type(JsonFieldType.STRING).description("name"),
                                fieldWithPath("email").type(JsonFieldType.STRING).description("email"),
                                fieldWithPath("nickname").type(JsonFieldType.STRING).description("nickname"),
                                fieldWithPath("birth").type(JsonFieldType.STRING).description("birth"),
                                fieldWithPath("birthType").type(JsonFieldType.STRING).description("birthType"),
                                fieldWithPath("mood").type(JsonFieldType.STRING).description("mood"),
                                fieldWithPath("role").type(JsonFieldType.STRING).description("role")
                        )
                    )
                );
    }
}
