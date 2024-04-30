package io.ssafy.gatee.domain.schedule.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.schedule.application.ScheduleService;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleEditReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleParticipateReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleSaveRecordReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleSaveReq;
import io.ssafy.gatee.global.security.config.TestSecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.List;
import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles({"common, prod"})
@AutoConfigureRestDocs
@WebMvcTest({ScheduleController.class, TestSecurityConfig.class})
@MockBean(JpaMetamodelMappingContext.class)
class ScheduleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ScheduleService scheduleService;


    @Test
    @CustomWithMockUser
    @DisplayName("가족 전체 일정 조회 테스트")
    void readSchedule() throws Exception {
        mockMvc.perform(get("/api/schedule")
                        .param("familyId", "1"))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("가족 전체 일정 조회"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("일정 상세 조회 테스트")
    void readScheduleDetail() throws Exception {
        mockMvc.perform(get("/api/schedule/1")
                        .param("familyId", "1"))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("일정 상세 조회"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("일정 등록 테스트")
    void saveSchedule() throws Exception {
        UUID memberId = UUID.randomUUID();

        ScheduleSaveReq scheduleSaveReq = ScheduleSaveReq.builder()
                .familyId(String.valueOf(1))
                .category("GROUP")
                .title("첫 번째 일정")
                .emoji("red")
                .content("스케줄 생성 테스트")
                .startDate("2024-03-12")
                .endDate("2024-04-15")
                .build();

        String scheduleSaveReqJson = objectMapper.writeValueAsString(scheduleSaveReq);

        mockMvc.perform(post("/api/schedule")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(scheduleSaveReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("일정 등록"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("일정 수정 테스트")
    void editSchedule() throws Exception {
        UUID memberId = UUID.randomUUID();

        ScheduleEditReq scheduleEditReq = ScheduleEditReq.builder()
                .familyId(String.valueOf(1))
                .category("GROUP")
                .title("첫 번째 일정")
                .emoji("red")
                .content("스케줄 생성 테스트")
                .startDate("2024-03-12")
                .endDate("2024-04-15")
                .build();

        String scheduleSaveReqJson = objectMapper.writeValueAsString(scheduleEditReq);

        mockMvc.perform(patch("/api/schedule/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(scheduleSaveReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("일정 수정"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("일정 참여 테스트")
    void participateSchedule() throws Exception {
        UUID memberId = UUID.randomUUID();

        ScheduleParticipateReq scheduleParticipateReq = ScheduleParticipateReq.builder()
                .familyId(String.valueOf(1))
                .build();

        String scheduleParticipateReqJson = objectMapper.writeValueAsString(scheduleParticipateReq);

        mockMvc.perform(post("/api/schedule/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(scheduleParticipateReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("일정 참여"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("일정 후기 등록 테스트")
    void saveScheduleRecord() throws Exception {
        Long[] fileIdList = new Long[3];

        fileIdList[0] = 1L;
        fileIdList[1] = 2L;
        fileIdList[2] = 3L;

        ScheduleSaveRecordReq scheduleSaveRecordReq = ScheduleSaveRecordReq.builder()
                .content("일정 후기 등록 테스트")
                .fileIdList(List.of(fileIdList))
                .build();

        String scheduleSaveRecordReqJson = objectMapper.writeValueAsString(scheduleSaveRecordReq);

        mockMvc.perform(post("/api/schedule/1/record")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(scheduleSaveRecordReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("일정 후기 등록"))
                .andExpect(status().isOk());
    }
}