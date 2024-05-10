package io.ssafy.gatee.domain.photo.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.photo.application.PhotoService;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@Slf4j
@ActiveProfiles({"common, prod"})
@WebMvcTest({{PhotoController.class})
@MockBean(JpaMetamodelMappingContext.class)
class PhotoControllerTest extends RestDocsTestSupport {

    @MockBean
    private PhotoService photoService;

    @Test
    @CustomWithMockUser
    void readPhotoList() throws Exception {

        // given
        PhotoListRes photoListRes1 = PhotoListRes.builder()
                .photoId(1L)
                .fileId(1L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-1")
                .build();

        PhotoListRes photoListRes2 = PhotoListRes.builder()
                .photoId(2L)
                .fileId(2L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-2")
                .build();

        List<PhotoListRes> photoListResList = new ArrayList<>();

        photoListResList.add(photoListRes1);
        photoListResList.add(photoListRes2);

        given(photoService.readPhotoList(any(PhotoListReq.class)))
                .willReturn(photoListResList);

        // where
        ResultActions result = mockMvc.perform(get("/api/photos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/photo/readPhotoList.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        //then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("filter").description("년 / 월 / 일").optional(),
                                parameterWithName("month").description("조회 기준 월").optional(),
                                parameterWithName("year").description("조회 기준 년").optional()
                        ),
                        responseFields(
                                fieldWithPath("")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    @DisplayName("사진 상세 조회 테스트")
    void readPhotoDetail() throws Exception {
        long photoId = 1L;

        mockMvc.perform(get("/api/photos/" + photoId)
                        .param("memberId", String.valueOf(UUID.randomUUID())))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("사진 상세 조회"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("사진 등록 테스트")
    void savePhoto() throws Exception {
        PhotoSaveReq photoSaveReq = PhotoSaveReq.builder()
                .fileId(1L)
                .build();

        String photoSaveReqJson = objectMapper.writeValueAsString(photoSaveReq);

        mockMvc.perform(post("/api/photos/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(photoSaveReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("사진 등록"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("사진 삭제 테스트")
    void deletePhoto() throws Exception {
        long photoId = 1L;

        mockMvc.perform(delete("/api/photos/" + photoId)
                        .param("memberFamilyId", "1"))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("사진 삭제"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("사진 상호작용 생성 테스트")
    void savePhotoReaction() throws Exception {
        UUID memberId = UUID.randomUUID();
        long photoId = 1L;

        mockMvc.perform(post("/api/photos/" + photoId + "/reaction")
                        .param("memberId", String.valueOf(memberId)))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("사진 상호작용 생성"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("사진 상호작용 삭제 테스트")
    void deletePhotoReaction() throws Exception {
        UUID memberId = UUID.randomUUID();
        long photoId = 1L;

        mockMvc.perform(delete("/api/photos/" + photoId + "/reaction")
                        .param("memberId", String.valueOf(memberId)))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("사진 상호작용 삭제"))
                .andExpect(status().isOk());
    }
}