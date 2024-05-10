package io.ssafy.gatee.domain.file.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.multipart;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.formParameters;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@Slf4j
@ActiveProfiles({"common, prod"})
@WebMvcTest({FileController.class})
@MockBean(JpaMetamodelMappingContext.class)
class FileControllerTest extends RestDocsTestSupport {

    @Test
    @CustomWithMockUser
    void uploadFile() throws Exception {

        // given
        // Mock 파일 생성
        MockMultipartFile file = new MockMultipartFile(
                "file", // 파일의 파라미터 이름
                "testImage1.jpg", // 실제 파일 이름
                "image/jpg", // 파일의 확장자 타입
                new FileInputStream(new File("src/test/resources/image/testImage1.jpg")) // 실제 파일
        );

        given(fileService.uploadFile(any(FileType.class), any(MultipartFile.class)))
                .willReturn(FileUrlRes.builder()
                        .fileId(1L)
                        .imageUrl("https://www.gaty.duckdns.org/s3-image-url-2")
                        .build());

        // when
        ResultActions result = mockMvc.perform(multipart("/api/files")
                .file(file)
                .param("fileType", "FAMILY_PROFILE")
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isCreated())
                .andDo(restDocs.document(
                        formParameters(
                                parameterWithName("file").description("이미지 파일").optional(),
                                parameterWithName("fileType").description("파일 타입").optional()
                        ),
                        responseFields(
                                fieldWithPath("fileId").type(JsonFieldType.NUMBER).description("파일 ID").optional(),
                                fieldWithPath("imageUrl").type(JsonFieldType.STRING).description("파일 URL").optional()
                        )
                ));
    }
}