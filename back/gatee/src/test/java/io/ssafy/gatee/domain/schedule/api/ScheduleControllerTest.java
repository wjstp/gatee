package io.ssafy.gatee.domain.schedule.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.schedule.application.ScheduleService;
import io.ssafy.gatee.domain.schedule.dto.request.*;
import io.ssafy.gatee.domain.schedule.dto.response.ParticipateMemberRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.domain.schedule.entity.Category;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import io.ssafy.gatee.domain.schedule_record.dto.response.ScheduleRecordRes;
import lombok.extern.slf4j.Slf4j;
import java.time.LocalDateTime;
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
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Slf4j
@ActiveProfiles({"common, prod"})
@WebMvcTest({ScheduleController.class})
@MockBean(JpaMetamodelMappingContext.class)
class ScheduleControllerTest extends RestDocsTestSupport {

    @MockBean
    private ScheduleService scheduleService;

    @Test
    @CustomWithMockUser
    void readSchedule() throws Exception {

        // given
        List<ScheduleListRes> scheduleListResList = new ArrayList<>();

        Schedule schedule1 = Schedule.builder()
                .id(1L)
                .category(Category.PERSONAL)
                .title("개인 일정 제목")
                .emoji("이모티콘")
                .content("개인 일정 내용")
                .startDate(LocalDateTime.parse("2024-05-01T00:00:00"))
                .endDate(LocalDateTime.parse("2024-05-12T23:59:59"))
                .build();

        Schedule schedule2 = Schedule.builder()
                .id(2L)
                .category(Category.PERSONAL)
                .title("가족 일정 제목")
                .emoji("이모티콘")
                .content("가족 일정 내용")
                .startDate(LocalDateTime.parse("2024-05-01T00:00:00"))
                .endDate(LocalDateTime.parse("2024-05-12T23:59:59"))
                .build();

        scheduleListResList.add(ScheduleListRes.toDto(schedule1));
        scheduleListResList.add(ScheduleListRes.toDto(schedule2));

        given(scheduleService.readSchedule(any(UUID.class)))
                .willReturn(scheduleListResList);

        // when
        ResultActions result = mockMvc.perform(get("/api/schedule")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("familyId", String.valueOf(UUID.randomUUID()))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].scheduleId").type(JsonFieldType.NUMBER).description("일정 ID"),
                                fieldWithPath("[].category").type(JsonFieldType.STRING).description("개인"),
                                fieldWithPath("[].title").type(JsonFieldType.STRING).description("일정 제목"),
                                fieldWithPath("[].emoji").type(JsonFieldType.STRING).description("이모티콘"),
                                fieldWithPath("[].content").type(JsonFieldType.STRING).description("일정 내용"),
                                fieldWithPath("[].startDate").type(JsonFieldType.STRING).description("시작 시간"),
                                fieldWithPath("[].endDate").type(JsonFieldType.STRING).description("종료 시간")
                                )
                ));
    }

    @Test
    @CustomWithMockUser
    void readScheduleDetail() throws Exception {

        // given
        List<ParticipateMemberRes> participateMemberResList = new ArrayList<>();

        ParticipateMemberRes participateMember1 = ParticipateMemberRes.builder()
                .nickname("엄마")
                .profileImageUrl("https://gaty.duckdns.org/s3-image-url-1")
                .build();

        ParticipateMemberRes participateMember2 = ParticipateMemberRes.builder()
                .nickname("아빠")
                .profileImageUrl("https://gaty.duckdns.org/s3-image-url-2")
                .build();

        participateMemberResList.add(participateMember1);
        participateMemberResList.add(participateMember2);

        List<FileUrlRes> fileUrlResList = new ArrayList<>();

        FileUrlRes fileUrlRes1 = FileUrlRes.builder()
                .fileId(1L)
                .imageUrl("https://gaty.duckdns.org/s3-image-url-3")
                .build();

        FileUrlRes fileUrlRes2 = FileUrlRes.builder()
                .fileId(2L)
                .imageUrl("https://gaty.duckdns.org/s3-image-url-4")
                .build();

        fileUrlResList.add(fileUrlRes1);
        fileUrlResList.add(fileUrlRes2);

        ScheduleRecordRes scheduleRecordRes = ScheduleRecordRes.builder()
                .content("일정 후기")
                .fileUrlList(fileUrlResList)
                .build();

        given(scheduleService.readScheduleDetail(any(Long.class), any(UUID.class)))
                .willReturn(ScheduleInfoRes.builder()
                        .scheduleId(1L)
                        .category(String.valueOf(Category.GROUP))
                        .title("가족 일정 제목")
                        .emoji("이모티콘")
                        .content("가족 일정 내용")
                        .startDate("2024-05-01")
                        .endDate("2024-05-12")
                        .scheduleRecordRes(scheduleRecordRes)
                        .participateMembers(participateMemberResList)
                        .build());

        // when
        ResultActions result = mockMvc.perform(get("/api/schedule/{scheduleId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("familyId", String.valueOf(UUID.randomUUID()))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("scheduleId").type(JsonFieldType.NUMBER).description("일정 ID"),
                                fieldWithPath("category").type(JsonFieldType.STRING).description("가족 / 개인"),
                                fieldWithPath("title").type(JsonFieldType.STRING).description("일정 제목"),
                                fieldWithPath("emoji").type(JsonFieldType.STRING).description("이모티콘"),
                                fieldWithPath("content").type(JsonFieldType.STRING).description("일정 내용"),
                                fieldWithPath("startDate").type(JsonFieldType.STRING).description("시작 시간"),
                                fieldWithPath("endDate").type(JsonFieldType.STRING).description("종료 시간"),
                                fieldWithPath("scheduleRecordRes").type(JsonFieldType.OBJECT).description("일정 후기"),
                                fieldWithPath("scheduleRecordRes.content").type(JsonFieldType.STRING).description("일정 후기 내용"),
                                fieldWithPath("scheduleRecordRes.fileUrlList").type(JsonFieldType.ARRAY).description("일정 후기 사진 목록"),
                                fieldWithPath("scheduleRecordRes.fileUrlList[].fileId").type(JsonFieldType.NUMBER).description("일정 후기 사진 파일 ID"),
                                fieldWithPath("scheduleRecordRes.fileUrlList[].imageUrl").type(JsonFieldType.STRING).description("일정 후기 사진 URL"),
                                fieldWithPath("participateMembers").type(JsonFieldType.ARRAY).description("일정 참여 멤버 목록"),
                                fieldWithPath("participateMembers[].nickname").type(JsonFieldType.STRING).description("닉네임"),
                                fieldWithPath("participateMembers[].profileImageUrl").type(JsonFieldType.STRING).description("프로필 사진 URL")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void saveSchedule() throws Exception {

        // given
        doNothing().when(scheduleService).saveSchedule(any(ScheduleSaveReq.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(post("/api/schedule")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/schedule/saveSchedule.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("category").description("가족 / 개인").optional(),
                                parameterWithName("title").description("일정 제목").optional(),
                                parameterWithName("emoji").description("이모티콘").optional(),
                                parameterWithName("content").description("일정 내용").optional(),
                                parameterWithName("startDate").description("시작 시간").optional(),
                                parameterWithName("endDate").description("종료 시간").optional(),
                                parameterWithName("memberIdList").description("참여 인원 ID 목록").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void editSchedule() throws Exception {

        // given
        doNothing().when(scheduleService).editSchedule(any(ScheduleEditReq.class), any(UUID.class), any(Long.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/schedule/{scheduleId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/schedule/editSchedule.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("category").description("가족 / 개인").optional(),
                                parameterWithName("title").description("일정 제목").optional(),
                                parameterWithName("emoji").description("이모티콘").optional(),
                                parameterWithName("content").description("일정 내용").optional(),
                                parameterWithName("startDate").description("시작 시간").optional(),
                                parameterWithName("endDate").description("종료 시간").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void deleteSchedule() throws Exception {

        // given
        doNothing().when(scheduleService).deleteSchedule(any(Long.class));

        // when
        ResultActions result = mockMvc.perform(delete("/api/schedule/{scheduleId}", 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void participateSchedule() throws Exception {

        // given
        doNothing().when(scheduleService).participateSchedule(any(ScheduleParticipateReq.class), any(UUID.class), any(Long.class));

        // when
        ResultActions result = mockMvc.perform(post("/api/schedule/{scheduleId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/schedule/participateSchedule.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void cancelSchedule() throws Exception {

        // given
        doNothing().when(scheduleService).cancelSchedule(any(ScheduleCancelReq.class), any(UUID.class), any(Long.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/schedule/{scheduleId}/cancel", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/schedule/cancelSchedule.json"))
                        .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void saveScheduleRecord() throws Exception {

        // given
        doNothing().when(scheduleService).saveScheduleRecord(any(ScheduleSaveRecordReq.class), any(UUID.class), any(Long.class));

        // when
        ResultActions result = mockMvc.perform(post("/api/schedule/{scheduleId}/record", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/schedule/saveScheduleRecord.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("content").description("후기 내용").optional(),
                                parameterWithName("fileIdList").description("파일 ID 목록").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void deleteScheduleRecord() throws Exception {

        // given
        doNothing().when(scheduleService).deleteScheduleRecord(any(Long.class));

        // when
        ResultActions result = mockMvc.perform(delete("/api/schedule/{scheduleId}/record", 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional()
                        )
                ));
    }
}