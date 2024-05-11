package io.ssafy.gatee.domain.feature.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.exam.dto.response.ExamDetailRes;
import io.ssafy.gatee.domain.feature.application.FeatureService;
import io.ssafy.gatee.domain.feature.dto.request.FeatureReq;
import io.ssafy.gatee.domain.feature.dto.response.FeatureRes;
import io.ssafy.gatee.domain.feature.dto.response.FeatureResultRes;
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

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
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

    @Test
    @CustomWithMockUser
    @DisplayName("백문백답 질문 조회")
    void readExamResultDetails() throws Exception {
        // given
        FeatureRes featureRes1 = FeatureRes.builder()
                .featureId(1L)
                .question("가장 가고 싶은 여행지는?").build();
        FeatureRes featureRes2 = FeatureRes.builder()
                .featureId(2L)
                .question("가장 가고 싶은 여행지는?").build();

        List<FeatureRes> featureResList = new ArrayList<>();
        featureResList.add(featureRes1);
        featureResList.add(featureRes2);

        given(featureService.readFeatureQuestions(any(UUID.class)))
                .willReturn(featureResList);


        // where
        ResultActions result = mockMvc.perform(RestDocumentationRequestBuilders.get("/api/features")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        responseFields(
                                fieldWithPath("[].featureId").type(JsonFieldType.NUMBER).description("feature Id").optional(),
                                fieldWithPath("[].question").type(JsonFieldType.STRING).description("백문백답 질문").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    @DisplayName("백문백답 질문 & 답변 조회")
    void readFeatureResult() throws Exception {
        // given
        FeatureResultRes featureRes1 = FeatureResultRes.builder()
                .question("가고 싶은 여행지")
                .answer("중국").build();
        FeatureResultRes featureRes2 = FeatureResultRes.builder()
                .question("가고 싶은 여행지")
                .answer("중국").build();

        List<FeatureResultRes> featureResList = new ArrayList<>();
        featureResList.add(featureRes1);
        featureResList.add(featureRes2);

        given(featureService.readFeatureResults(any(UUID.class)))
                .willReturn(featureResList);


        // where
        ResultActions result = mockMvc.perform(RestDocumentationRequestBuilders.get("/api/features")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON));

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        responseFields(
                                fieldWithPath("[].question").type(JsonFieldType.STRING).description("백문백답 질문").optional(),
                                fieldWithPath("[].answer").type(JsonFieldType.STRING).description("백문백답 답변").optional()
                        )
                ));
    }

}