package io.ssafy.gatee.domain.schedule.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.domain.member.entity.BirthType;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.schedule.application.ScheduleService;
import io.ssafy.gatee.domain.schedule.dto.request.*;
import io.ssafy.gatee.domain.schedule.dto.response.ParticipateMemberRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.domain.schedule.entity.Category;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import io.ssafy.gatee.domain.schedule_record.dto.response.ScheduleRecordPhotoRes;
import io.ssafy.gatee.domain.schedule_record.dto.response.ScheduleRecordRes;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
@ActiveProfiles({"common", "test"})
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

        List<Member> memberList = new ArrayList<>();

        File file = File.builder()
                .fileType(FileType.MEMBER_PROFILE)
                .dir("default/")
                .url("https://gaty.duckdns.org/s3-image-url")
                .originalName("profile image")
                .name("image")
                .build();

        Member member1 = Member.builder()
                .name("test1")
                .email("test1@gmail.com")
                .nickname("test1")
                .birth(LocalDate.parse("2000-07-20"))
                .birthType(BirthType.valueOf("SOLAR"))
                .mood("happy")
                .phoneNumber("010-0101-0101")
                .file(file)
                .build();

        Member member2 = Member.builder()
                .name("test2")
                .email("test2@gmail.com")
                .nickname("test2")
                .birth(LocalDate.parse("2000-07-20"))
                .birthType(BirthType.valueOf("SOLAR"))
                .mood("happy")
                .phoneNumber("010-0101-0101")
                .file(file)
                .build();

        memberList.add(member1);
        memberList.add(member2);

        scheduleListResList.add(ScheduleListRes.toDto(schedule1, memberList, 0));
        scheduleListResList.add(ScheduleListRes.toDto(schedule2, memberList, 1));

        given(scheduleService.readSchedule(any(UUID.class), any(Integer.class)))
                .willReturn(scheduleListResList);

        // when
        ResultActions result = mockMvc.perform(get("/api/schedule")
                        .contentType(MediaType.APPLICATION_JSON)
                        .param("familyId", String.valueOf(UUID.randomUUID()))
                        .param("month", String.valueOf(5))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("month").description("조회 월").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].scheduleId").type(JsonFieldType.NUMBER).description("일정 ID"),
                                fieldWithPath("[].category").type(JsonFieldType.STRING).description("개인"),
                                fieldWithPath("[].title").type(JsonFieldType.STRING).description("일정 제목"),
                                fieldWithPath("[].emoji").type(JsonFieldType.STRING).description("이모티콘"),
                                fieldWithPath("[].content").type(JsonFieldType.STRING).description("일정 내용"),
                                fieldWithPath("[].startDate").type(JsonFieldType.STRING).description("시작 시간"),
                                fieldWithPath("[].endDate").type(JsonFieldType.STRING).description("종료 시간"),
                                fieldWithPath("[].participateMembers").type(JsonFieldType.ARRAY).description("일정 참여 멤버"),
                                fieldWithPath("[].participateMembers[].nickname").type(JsonFieldType.STRING).description("참여 멤버 별명"),
                                fieldWithPath("[].participateMembers[].profileImageUrl").type(JsonFieldType.STRING).description("참여 멤버 프로필 이미지 URL"),
                                fieldWithPath("[].scheduleRecordCount").type(JsonFieldType.NUMBER).description("일정 후기 개수")
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

        List<ScheduleRecordPhotoRes> scheduleRecordPhotoResList = new ArrayList<>();

        ScheduleRecordPhotoRes scheduleRecordPhotoRes1 = ScheduleRecordPhotoRes.builder()
                .photoId(1L)
                .imageUrl("https://gaty.duckdns.org/s3-image-url-3")
                .build();

        ScheduleRecordPhotoRes scheduleRecordPhotoRes2 = ScheduleRecordPhotoRes.builder()
                .photoId(2L)
                .imageUrl("https://gaty.duckdns.org/s3-image-url-4")
                .build();

        scheduleRecordPhotoResList.add(scheduleRecordPhotoRes1);
        scheduleRecordPhotoResList.add(scheduleRecordPhotoRes2);

        List<ScheduleRecordRes> scheduleRecordResList = new ArrayList<>();

        ScheduleRecordRes scheduleRecordRes1 = ScheduleRecordRes.builder()
                .scheduleRecordId(1L)
                .profileImageUrl("https://gaty.duckdns.org/profile-image-url-1")
                .nickname("이윤정")
                .content("일정 후기")
                .scheduleRecordPhotoResList(scheduleRecordPhotoResList)
                .build();

        ScheduleRecordRes scheduleRecordRes2 = ScheduleRecordRes.builder()
                .scheduleRecordId(2L)
                .profileImageUrl("https://gaty.duckdns.org/profile-image-url-2")
                .nickname("윤예빈")
                .content("일정 후기")
                .scheduleRecordPhotoResList(scheduleRecordPhotoResList)
                .build();

        scheduleRecordResList.add(scheduleRecordRes1);
        scheduleRecordResList.add(scheduleRecordRes2);

        given(scheduleService.readScheduleDetail(any(Long.class), any(UUID.class)))
                .willReturn(ScheduleInfoRes.builder()
                        .scheduleId(1L)
                        .category(String.valueOf(Category.GROUP))
                        .title("가족 일정 제목")
                        .emoji("이모티콘")
                        .content("가족 일정 내용")
                        .startDate("2024-05-01")
                        .endDate("2024-05-12")
                        .scheduleRecordResList(scheduleRecordResList)
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
                                fieldWithPath("scheduleRecordResList").type(JsonFieldType.ARRAY).description("일정 후기 목록"),
                                fieldWithPath("scheduleRecordResList[].scheduleRecordId").type(JsonFieldType.NUMBER).description("일정 후기 ID"),
                                fieldWithPath("scheduleRecordResList[].profileImageUrl").type(JsonFieldType.STRING).description("일정 후기 멤버 프로필 이미지 URL"),
                                fieldWithPath("scheduleRecordResList[].nickname").type(JsonFieldType.STRING).description("일정 후기 멤버 별명"),
                                fieldWithPath("scheduleRecordResList[].content").type(JsonFieldType.STRING).description("일정 후기 내용"),
                                fieldWithPath("scheduleRecordResList[].scheduleRecordPhotoResList").type(JsonFieldType.ARRAY).description("일정 후기 사진 목록"),
                                fieldWithPath("scheduleRecordResList[].scheduleRecordPhotoResList[].photoId").type(JsonFieldType.NUMBER).description("일정 후기 사진 ID"),
                                fieldWithPath("scheduleRecordResList[].scheduleRecordPhotoResList[].imageUrl").type(JsonFieldType.STRING).description("일정 후기 사진 URL"),
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
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("content").description("후기 내용").optional(),
                                parameterWithName("fileIdList").description("파일 ID 목록").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void deleteScheduleRecord() throws Exception {

        // given
        doNothing().when(scheduleService).deleteScheduleRecord(any(Long.class), any(Long.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(delete("/api/schedule/{scheduleId}/record/{scheduleRecordId}", 1L, 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("scheduleId").description("일정 ID").optional(),
                                parameterWithName("scheduleRecordId").description("일정 후기 ID").optional()
                        )
                ));
    }
}