package io.ssafy.gatee.domain.family.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dto.request.FamilyJoinReq;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCheckRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.dto.response.FamilySaveRes;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.type.FileType;
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

import java.io.File;
import java.io.FileInputStream;
import java.util.List;
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
@WebMvcTest({FamilyController.class})
@MockBean(JpaMetamodelMappingContext.class)
class FamilyControllerTest extends RestDocsTestSupport {

    @MockBean
    private FamilyService familyService;


    @Test
    @CustomWithMockUser
    void saveFamily() throws Exception {

        // given

        // Mock 파일 생성
        MockMultipartFile file = new MockMultipartFile(
                "file", // 파일의 파라미터 이름
                "testImage1.jpg", // 실제 파일 이름
                "image/jpg", // 파일의 확장자 타입
                new FileInputStream(new File("src/test/resources/image/testImage1.jpg")) // 실제 파일
        );

        given(familyService.saveFamily(any(String.class), any(UUID.class), any(FileType.class), any(MockMultipartFile.class)))
                .willReturn(FamilySaveRes.builder()
                        .familyId(UUID.randomUUID())
                        .fileUrl(FileUrlRes.builder()
                                .fileId(1L)
                                .imageUrl("https://www.gaty.duckdns.org/image-url")
                                .build())
                        .build());

        // when
        ResultActions result = mockMvc.perform(multipart("/api/family")
                        .file(file)
                        .param("name", "family name")
                        .param("fileType", "FAMILY_PROFILE")
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        formParameters(
                                parameterWithName("file").description("이미지 파일").optional(),
                                parameterWithName("name").description("가족 이름").optional(),
                                parameterWithName("fileType").description("파일 타입").optional()
                        ),
                        responseFields(
                                fieldWithPath("familyId").type(JsonFieldType.STRING).description("가족 ID").optional(),
                                fieldWithPath("fileUrl.fileId").type(JsonFieldType.NUMBER).description("파일 ID").optional(),
                                fieldWithPath("fileUrl.imageUrl").type(JsonFieldType.STRING).description("파일 URL").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void createFamilyCode() throws Exception {

        // given
        given(familyService.createFamilyCode(any(String.class)))
                .willReturn(FamilyCodeRes.builder()
                        .familyCode("B2A3D1F4")
                        .build());

        // when
        ResultActions result = mockMvc.perform(get("/api/family/code")
                .contentType(MediaType.APPLICATION_JSON)
                .param("familyId", String.valueOf(UUID.randomUUID()))
                .accept(MediaType.APPLICATION_JSON));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("familyCode").type(JsonFieldType.STRING).description("가족 초대 코드")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void joinFamily() throws Exception {

        // given
        doNothing().when(familyService).joinFamily(any(FamilyJoinReq.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(post("/api/family/join")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/family/joinFamily.json"))
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyCode").description("가족 초대 코드").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void checkFamilyCode() throws Exception {

        // given
        given(familyService.checkFamilyCode(any(String.class), any(UUID.class)))
                .willReturn(FamilyCheckRes.builder()
                        .familyName("가족 이름")
                        .familyId("가족 id")
                        .build());

        // when
        ResultActions result = mockMvc.perform(post("/api/family/code")
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/family/checkFamilyCode.json"))
                .accept(MediaType.APPLICATION_JSON)

        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        responseFields(
                                fieldWithPath("familyId").type(JsonFieldType.STRING).description("가족 id"),
                                fieldWithPath("familyName").type(JsonFieldType.STRING).description("가족 이름"))
        ));
    }


    @Test
    @CustomWithMockUser
    void readFamily() throws Exception {

        // given
        given(familyService.readFamily(any(String.class)))
                .willReturn(FamilyInfoRes.builder()
                        .name("세진이네")
                        .familyScore(0)
                        .memberFamilyInfoList(any(List.class))
                        .build());

        // when
        ResultActions result = mockMvc.perform(get("/api/family")
                .param("familyId", String.valueOf(UUID.randomUUID()))
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                          parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("name").type(JsonFieldType.STRING).description("가족 이름"),
                                fieldWithPath("familyScore").type(JsonFieldType.NUMBER).description("가족 점수"),
                                fieldWithPath("memberFamilyInfoList").type(JsonFieldType.ARRAY).description("가족 구성원 목록").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void editFamilyName() throws Exception {

        // given
        doNothing().when(familyService).editFamilyName(any(UUID.class), any(FamilyNameReq.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/family/{familyId}", UUID.randomUUID())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/family/editFamilyName.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        )
                ));
    }
}