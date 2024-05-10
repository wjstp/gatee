package io.ssafy.gatee.domain.photo.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.photo.application.PhotoService;
import io.ssafy.gatee.domain.photo.dto.request.PhotoDeleteReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.domain.photo.dto.response.PhotoDetailRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoListRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoSaveRes;
import io.ssafy.gatee.domain.photo.dto.response.PhotoThumbnailRes;
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
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;

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
@WebMvcTest({PhotoController.class})
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
                                fieldWithPath("[].photoId").type(JsonFieldType.NUMBER).description("사진 ID").optional(),
                                fieldWithPath("[].fileId").type(JsonFieldType.NUMBER).description("파일 ID").optional(),
                                fieldWithPath("[].imageUrl").type(JsonFieldType.STRING).description("사진 URL").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void readPhotoThumbnailList() throws Exception {

        // given
        PhotoThumbnailRes photoThumbnailRes1 = PhotoThumbnailRes.builder()
                .photoId(1L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-1")
                .build();

        PhotoThumbnailRes photoThumbnailRes2 = PhotoThumbnailRes.builder()
                .photoId(2L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-2")
                .build();

        List<PhotoThumbnailRes> photoThumbnailResList = new ArrayList<>();

        photoThumbnailResList.add(photoThumbnailRes1);
        photoThumbnailResList.add(photoThumbnailRes2);

        given(photoService.readPhotoThumbnailList(any(String.class), any(UUID.class), any(UUID.class)))
                .willReturn(photoThumbnailResList);

        // when
        ResultActions result = mockMvc.perform(get("/api/photos/thumbnails")
                .contentType(MediaType.APPLICATION_JSON)
                .param("filter", "MONTH")
                .param("familyId", String.valueOf(UUID.randomUUID()))
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("filter").description("MONTH / YEAR").optional(),
                                parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                 fieldWithPath("[].photoId").type(JsonFieldType.NUMBER).description("사진 ID"),
                                fieldWithPath("[].imageUrl").type(JsonFieldType.STRING).description("사진 URL")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void readPhotoDetail() throws Exception {

        // given
        given(photoService.readPhotoDetail(any(Long.class), any(UUID.class)))
                .willReturn(PhotoDetailRes.builder()
                        .photoId(1L)
                        .imageUrl("https:/")
                        .build()
                );
        long photoId = 1L;

        mockMvc.perform(get("/api/photos/" + photoId)
                        .param("memberId", String.valueOf(UUID.randomUUID())))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("사진 상세 조회"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    void savePhoto() throws Exception {

        // given
        given(photoService.savePhoto(any(PhotoSaveReq.class), any(UUID.class)))
                .willReturn(PhotoSaveRes.builder()
                        .photoId(1L)
                        .build());

        // when
        ResultActions result = mockMvc.perform(post("/api/photos/save")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/photo/savePhoto.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("fileId").description("파일 ID").optional(),
                                parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("photoId").type(JsonFieldType.NUMBER).description("사진 ID")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void deletePhoto() throws Exception {

        // given
        doNothing().when(photoService).deletePhoto(any(PhotoDeleteReq.class), any(Long.class), any(UUID.class));

        // when
        ResultActions result = mockMvc.perform(delete("/api/photos/{photoId}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/photo/deletePhoto.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("photoId").description("사진 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        )
                ));
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