package io.ssafy.gatee.domain.member.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.domain.member.application.MemberService;
import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.request.MemberTokenReq;
import io.ssafy.gatee.domain.member.dto.response.MemberEditProfileImageRes;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
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
    void editProfileImage() throws Exception {

        // given
        given(memberService.editProfileImage(any(String.class), any(FileType.class), any(MultipartFile.class)))
                .willReturn(MemberEditProfileImageRes.builder()
                        .imageUrl("https://spring-learning.s3.ap-southeast-2.amazonaws.com/default/profile_oldman.PNG")
                        .build());

        // when
        // Mock 파일 생성
        MockMultipartFile file = new MockMultipartFile(
                "file", // 파일의 파라미터 이름
                "testImage1.jpg", // 실제 파일 이름
                "image/jpg", // 파일의 확장자 타입
                new FileInputStream(new File("src/test/resources/image/testImage1.jpg")) // 실제 파일
        );

        ResultActions result = mockMvc.perform(multipart("/api/members/image")
                .file(file)
                .param("defaultImage", "oldman")
                .param("fileType", "FAMILY_PROFILE")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .accept(MediaType.APPLICATION_JSON)
        );

        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        formParameters(
                                parameterWithName("defaultImage").description("기본 이미지 이름").optional(),
                                parameterWithName("fileType").description("파일 타입").optional(),
                                parameterWithName("file").description("사진 파일").optional()
                        ),
                        responseFields(
                                fieldWithPath("imageUrl").type(JsonFieldType.STRING).description("파일 URL")
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
                        .memberFamilyId(1L)
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
                                        fieldWithPath("memberFamilyId").type(JsonFieldType.NUMBER).description("회원 가족 ID"),
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
