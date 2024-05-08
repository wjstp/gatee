package io.ssafy.gatee.domain.family.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.UUID;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
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
    @DisplayName("가족 생성 테스트")
    void saveFamily() throws Exception {
        FamilySaveReq familySaveReq = FamilySaveReq.builder()
                .name("우리집")
                .build();

        String familySaveJson = objectMapper.writeValueAsString(familySaveReq);

        mockMvc.perform(post("/api/family")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(familySaveJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("가족 생성"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("가족 코드 생성 테스트")
    void createFamilyCode() throws Exception {
        mockMvc.perform(get("/api/family/1/code"))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("가족 코드 생성"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("가족 합류 테스트")
    void joinFamily() throws Exception {
        mockMvc.perform(post("/api/family/join")
                        .param("familyCode", "A1B2C3D4")
                        .param("memberId", String.valueOf(UUID.randomUUID())))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("가족 합류"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    void readFamily() throws Exception {

//        Member member = Member.builder()
//                .name("member1")
//                .email("member1@gmail.com")
//                .nickname("member1")
//                .birth(LocalDate.parse("2000-07-20"))
//                .birthType(BirthType.SOLAR)
//                .mood("happy")
//                .phoneNumber("010-1010-1010")
//                .build();

//        List<MemberFamilyInfoRes> memberFamilyList = new ArrayList<>();
//
//        memberFamilyList.add(MemberFamilyInfoRes.toDto(MemberFamily.builder()
//                .member(any(Member.class))
//                .family(any(Family.class))
//                .build()));

        given(familyService.readFamily(any()))
                .willReturn(FamilyInfoRes.builder()
                        .name("세진이네")
                        .familyScore(0)
                        .memberFamilyInfoList(any())
                        .build());


        mockMvc.perform(get("/api/family/{familyId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                ).andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("familyId").description("가족 ID")
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
    @DisplayName("가족 이름 수정 테스트")
    void editFamilyName() throws Exception {
        FamilyNameReq familyNameReq = FamilyNameReq.builder()
                .name("우리집")
                .build();

        String editFamilyNameJson = objectMapper.writeValueAsString(familyNameReq);

        mockMvc.perform(patch("/api/family/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(editFamilyNameJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("가족 이름 수정"))
                .andExpect(status().isOk());
    }
}