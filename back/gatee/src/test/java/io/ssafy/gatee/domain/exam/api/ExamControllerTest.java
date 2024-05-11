package io.ssafy.gatee.domain.exam.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.album.api.AlbumController;
import io.ssafy.gatee.domain.exam.application.ExamService;
import io.ssafy.gatee.domain.exam.dto.request.ExamReq;
import io.ssafy.gatee.domain.exam.dto.response.ExamDetailRes;
import io.ssafy.gatee.domain.exam.dto.response.ExamRes;
import io.ssafy.gatee.domain.exam.dto.response.ExamResultRes;
import io.ssafy.gatee.global.security.config.SecurityConfig;
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
import java.util.Collections;
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
@WebMvcTest({ExamController.class})
@MockBean(JpaMetamodelMappingContext.class)
class ExamControllerTest extends RestDocsTestSupport {

    @MockBean
    private ExamService examService;

    @Test
    @CustomWithMockUser
    void readExam() throws Exception {

        // given
        List<ExamRes> examResList = new ArrayList<>();

        ExamRes examRes1 = ExamRes.builder()
                .questionWord("문제 핵심 단어")
                .correctAnswer("정답 문장")
                .nickname("수지")
                .wrongAnswers(Collections.singletonList("틀린 문장"))
                .build();
        ExamRes examRes2 = ExamRes.builder()
                .questionWord("문제 핵심 단어")
                .correctAnswer("정답 문장")
                .nickname("차은우")
                .wrongAnswers(Collections.singletonList("틀린 문장"))
                .build();

        examResList.add(examRes1);
        examResList.add(examRes2);

        given(examService.readExam(any(UUID.class)))
                .willReturn(examResList);

        // where
        ResultActions result = mockMvc.perform(get("/api/exams")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        responseFields(
                                fieldWithPath("[].questionWord").type(JsonFieldType.STRING).description("문제 핵심 단어"),
                                fieldWithPath("[].correctAnswer").type(JsonFieldType.STRING).description("정답 문장"),
                                fieldWithPath("[].nickname").type(JsonFieldType.STRING).description("닉네임"),
                                fieldWithPath("[].wrongAnswers").type(JsonFieldType.ARRAY).description("틀린 문장 리스트")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void readExamResults() throws Exception {

        // given
        List<ExamResultRes> examResList = new ArrayList<>();

        ExamResultRes examRes1 = ExamResultRes.builder()
                .examId(1L)
                .score(100)
                .createdAt("1999-01-01")
                .build();

        ExamResultRes examRes2 = ExamResultRes.builder()
                .examId(2L)
                .score(100)
                .createdAt("1999-01-01")
                .build();

        examResList.add(examRes1);
        examResList.add(examRes2);

        given(examService.readExamResults(any(UUID.class)))
                .willReturn(examResList);


        // where
        ResultActions result = mockMvc.perform(get("/api/exams/results")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        responseFields(
                                fieldWithPath("[].score").type(JsonFieldType.NUMBER).description("점수"),
                                fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("모의고사를 푼 날짜")
                                fieldWithPath("[].examId").type(JsonFieldType.NUMBER).description("모의고사 id").optional(),
                                fieldWithPath("[].score").type(JsonFieldType.NUMBER).description("점수").optional(),
                                fieldWithPath("[].createdAt").type(JsonFieldType.STRING).description("모의고사를 푼 날짜").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void readExamResultDetails() throws Exception {

        // given
        List<String> answerList = new ArrayList<>();

        answerList.add("답변1");
        answerList.add("답변2");

        List<ExamDetailRes> examResList = new ArrayList<>();

        ExamDetailRes examRes1 = ExamDetailRes.builder()
                .question("문제")
                .answerList(answerList)
                .choiceNumber(1)
                .correctNumber(2)
                .build();

        ExamDetailRes examRes2 = ExamDetailRes.builder()
                .question("문제")
                .answerList(answerList)
                .choiceNumber(1)
                .correctNumber(2)
                .build();

        examResList.add(examRes1);
        examResList.add(examRes2);

        given(examService.readExamResultDetail(any(Long.class)))
                .willReturn(examResList);


        // where
        ResultActions result = mockMvc.perform(get("/api/exams/{examId}/results", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("examId").description("모의고사 id").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].question").type(JsonFieldType.STRING).description("질문"),
                                fieldWithPath("[].answerList").type(JsonFieldType.ARRAY).description("선지리스트"),
                                fieldWithPath("[].choiceNumber").type(JsonFieldType.NUMBER).description("선택했던번호"),
                                fieldWithPath("[].correctNumber").type(JsonFieldType.NUMBER).description("정답 번호")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void saveExamResult() throws Exception {

        // given
        doNothing().when(examService).saveExamResult(any(ExamReq.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(post("/api/exams")
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/exam/saveExamResult.json"))
                .accept(MediaType.APPLICATION_JSON)
        );

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                       queryParameters(
                               parameterWithName("examResults").description("문제 푼 내역 객체 리스트").optional(),
                               parameterWithName("examResults[].question").description("문제").optional(),
                               parameterWithName("examResults[].answerList").description("답안 리스트").optional(),
                               parameterWithName("examResults[].choiceNumber").description("선택 번호").optional(),
                               parameterWithName("examResults[].correctNumber").description("정답 번호").optional(),
                               parameterWithName("score").description("모의고사 점수").optional()
                       )
                ));
    }

}