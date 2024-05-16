package io.ssafy.gatee.domain.mission.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.mission.application.MissionService;
import io.ssafy.gatee.domain.mission.dto.request.MissionTypeReq;
import io.ssafy.gatee.domain.mission.dto.response.MissionImprovementsRes;
import io.ssafy.gatee.domain.mission.dto.response.MissionInfoRes;
import io.ssafy.gatee.domain.mission.dto.response.MissionListRes;
import io.ssafy.gatee.domain.mission.entity.Type;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.patch;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.queryParameters;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@ActiveProfiles({"common, prod"})
@WebMvcTest({MissionController.class})
@MockBean(JpaMetamodelMappingContext.class)
class MissionControllerTest extends RestDocsTestSupport {

    @MockBean
    private MissionService missionService;

    @Test
    @CustomWithMockUser
    void readMission() throws Exception {

        // given
        MissionImprovementsRes missionImprovementsRes = MissionImprovementsRes.builder()
                .albumMission(false)
                .examMission(true)
                .featureMission(false)
                .scheduleMission(false)
                .build();

        List<MissionListRes> missionListResList = new ArrayList<>();

        MissionListRes featureMissionRes = MissionListRes.builder()
                .id(1L)
                .type(Type.FEATURE)
                .isComplete(true)
                .nowRange(11)
                .maxRange(20)
                .completedLevel(1)
                .build();

        MissionListRes examMissionRes = MissionListRes.builder()
                .id(2L)
                .type(Type.EXAM)
                .isComplete(false)
                .nowRange(0)
                .maxRange(1)
                .completedLevel(0)
                .build();

        MissionListRes scheduleMissionRes = MissionListRes.builder()
                .id(3L)
                .type(Type.SCHEDULE)
                .isComplete(false)
                .nowRange(2)
                .maxRange(3)
                .completedLevel(0)
                .build();

        MissionListRes albumMissionRes = MissionListRes.builder()
                .id(4L)
                .type(Type.ALBUM)
                .isComplete(true)
                .nowRange(11)
                .maxRange(20)
                .completedLevel(1)
                .build();

        missionListResList.add(featureMissionRes);
        missionListResList.add(examMissionRes);
        missionListResList.add(scheduleMissionRes);
        missionListResList.add(albumMissionRes);

        given(missionService.readMission(any(UUID.class), any(UUID.class)))
                .willReturn(MissionInfoRes.builder()
                        .missionImprovementsRes(missionImprovementsRes)
                        .missionListResList(missionListResList)
                        .build());

        // when
        ResultActions result = mockMvc.perform(get("/api/missions")
                .param("familyId", String.valueOf(UUID.randomUUID()))
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("missionImprovementsRes").type(JsonFieldType.OBJECT).description("개선 사항 여부"),
                                fieldWithPath("missionImprovementsRes.albumMission").type(JsonFieldType.BOOLEAN).description("앨범 미션 개선 여부"),
                                fieldWithPath("missionImprovementsRes.examMission").type(JsonFieldType.BOOLEAN).description("모의고사 미션 개선 여부"),
                                fieldWithPath("missionImprovementsRes.featureMission").type(JsonFieldType.BOOLEAN).description("백문백답 미션 개선 여부"),
                                fieldWithPath("missionImprovementsRes.scheduleMission").type(JsonFieldType.BOOLEAN).description("일정 미션 개선 여부"),
                                fieldWithPath("missionListResList").type(JsonFieldType.ARRAY).description("미션 목록"),
                                fieldWithPath("missionListResList[].id").type(JsonFieldType.NUMBER).description("미션 ID"),
                                fieldWithPath("missionListResList[].type").type(JsonFieldType.STRING).description("미션 타입"),
                                fieldWithPath("missionListResList[].isComplete").type(JsonFieldType.BOOLEAN).description("완료 여부"),
                                fieldWithPath("missionListResList[].nowRange").type(JsonFieldType.NUMBER).description("현재 진행도"),
                                fieldWithPath("missionListResList[].maxRange").type(JsonFieldType.NUMBER).description("최대 진행도"),
                                fieldWithPath("missionListResList[].completedLevel").type(JsonFieldType.NUMBER).description("완료된 단계")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void progressMission() throws Exception {

        // given
        doNothing().when(missionService).progressMission(any(UUID.class), any(MissionTypeReq.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/missions")
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/mission/progressMission.json"))
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("type").description("미션 타입").optional(),
                                parameterWithName("photoCount").description("앨범 미션 : 사진의 개수").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void completeMission() throws Exception {

        // given
        doNothing().when(missionService).completeMission(any(UUID.class), any(Type.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/missions/complete")
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/mission/completeMission.json"))
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("type").description("미션 타입").optional()
                        )
                ));
    }
}