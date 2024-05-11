package io.ssafy.gatee.domain.feature.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.feature.application.FeatureService;
import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@ActiveProfiles({"common, prod"})
@AutoConfigureRestDocs
@WebMvcTest({FeatureController.class})
@MockBean(JpaMetamodelMappingContext.class)
class FeatureControllerTest extends RestDocsTestSupport {

    @MockBean
    private FeatureService featureService;

    @Test
    @CustomWithMockUser
    @DisplayName("백문백답 답변 저장")
    void saveFeature() throws Exception {
        // given
        doNothing().when(featureService).saveFeature(any(UUID.class), any(FeatureReq.class));

        // when
        ResultActions result = mockMvc.perform(RestDocumentationRequestBuilders.post("/api/features")
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/feature/saveFeature.json"))
                .accept(MediaType.APPLICATION_JSON));

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        requestFields(
                                fieldWithPath("featureId").description("백문백답 id"),
                                fieldWithPath("answer").description("답변").optional()
                        )
                ));
    }

}