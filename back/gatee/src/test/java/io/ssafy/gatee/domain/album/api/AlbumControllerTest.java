package io.ssafy.gatee.domain.album.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.album.application.AlbumService;
import io.ssafy.gatee.domain.album.dto.request.AddAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.request.DeleteAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumSaveRes;
import jakarta.validation.constraints.NotNull;
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
@WebMvcTest({AlbumController.class})
@MockBean(JpaMetamodelMappingContext.class)
class AlbumControllerTest extends RestDocsTestSupport {

    @MockBean
    private AlbumService albumService;

    @Test
    @CustomWithMockUser
    void readAlbumList() throws Exception {

        // given
        List<AlbumListRes> albumListResList = new ArrayList<>();

        AlbumListRes albumListRes1 = AlbumListRes.builder()
                .albumId(1L)
                .name("첫번째 앨범")
                .photoId(1L)
                .imageUrl("https://www.gaty.duckdns.org/image-url-1")
                .build();

        AlbumListRes albumListRes2 = AlbumListRes.builder()
                .albumId(1L)
                .name("두번째 앨범")
                .photoId(2L)
                .imageUrl("https://www.gaty.duckdns.org/image-url-2")
                .build();

        albumListResList.add(albumListRes1);
        albumListResList.add(albumListRes2);

        given(albumService.readAlbumList(any(UUID.class)))
                .willReturn(albumListResList);

        // when
        ResultActions result = mockMvc.perform(get("/api/albums")
                        .param("familyId", String.valueOf(UUID.randomUUID()))
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].albumId").type(JsonFieldType.NUMBER).description("앨범 ID"),
                                fieldWithPath("[].name").type(JsonFieldType.STRING).description("앨범 이름"),
                                fieldWithPath("[].photoId").type(JsonFieldType.NUMBER).description("사진 ID"),
                                fieldWithPath("[].imageUrl").type(JsonFieldType.STRING).description("사진 URL")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void readAlbumDetail() throws Exception {

        // given
        List<AlbumPhotoListRes> albumPhotoListResList = new ArrayList<>();

        AlbumPhotoListRes albumPhotoListRes1 = AlbumPhotoListRes.builder()
                .photoId(1L)
                .fileId(1L)
                .imageUrl("https://www.gaty.duckdns.org/image-url-1")
                .memberFamilyId(1L)
                .photoAlbumId(1L)
                .build();

        AlbumPhotoListRes albumPhotoListRes2 = AlbumPhotoListRes.builder()
                .photoId(2L)
                .fileId(2L)
                .imageUrl("https://www.gaty.duckdns.org/image-url-2")
                .memberFamilyId(1L)
                .photoAlbumId(1L)
                .build();

        albumPhotoListResList.add(albumPhotoListRes1);
        albumPhotoListResList.add(albumPhotoListRes2);

        given(albumService.readAlbumDetail(any(Long.class)))
                .willReturn(albumPhotoListResList);

        // when
        ResultActions result = mockMvc.perform(get("/api/albums/{albumId}", 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("albumId").description("앨범 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].photoId").type(JsonFieldType.NUMBER).description("사진 ID"),
                                fieldWithPath("[].fileId").type(JsonFieldType.NUMBER).description("파일 ID"),
                                fieldWithPath("[].imageUrl").type(JsonFieldType.STRING).description("사진 URL"),
                                fieldWithPath("[].memberFamilyId").type(JsonFieldType.NUMBER).description("가족 회원 ID"),
                                fieldWithPath("[].photoAlbumId").type(JsonFieldType.NUMBER).description("앨범 사진 ID")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void saveAlbum() throws Exception {

        // given
        given(albumService.saveAlbum(any(AlbumSaveReq.class)))
                .willReturn(AlbumSaveRes.builder()
                        .albumId(1L)
                        .build());

        // when
        ResultActions result = mockMvc.perform(post("/api/albums")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/album/saveAlbum.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        queryParameters(
                                parameterWithName("familyId").description("가족 ID").optional(),
                                parameterWithName("name").description("앨범 이름").optional()
                        ),
                        responseFields(
                                fieldWithPath("albumId").type(JsonFieldType.NUMBER).description("앨범 ID")
                        )
                ));

    }

    @Test
    @CustomWithMockUser
    void editAlbumName() throws Exception {

        // given
        doNothing().when(albumService).editAlbumName(any(Long.class), any(String.class));

        // when
        ResultActions result = mockMvc.perform(patch("/api/albums/{albumId}", 1L)
                        .param("name", "변경할 앨범 이름")
                        .contentType(MediaType.APPLICATION_JSON)
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("albumId").description("앨범 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("name").description("변경할 앨범 이름").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void deleteAlbum() throws Exception {

        // given
        doNothing().when(albumService).deleteAlbum(any(Long.class));

        // when
        ResultActions result = mockMvc.perform(delete("/api/albums/{albumId}", 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("albumId").description("앨범 ID").optional()
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void addAlbumPhotoList() throws Exception {

        // given
        List<AlbumPhotoListRes> albumPhotoListResList = new ArrayList<>();

        AlbumPhotoListRes albumPhotoListRes1 = AlbumPhotoListRes.builder()
                .photoId(1L)
                .fileId(1L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-1")
                .memberFamilyId(1L)
                .photoAlbumId(1L)
                .build();

        AlbumPhotoListRes albumPhotoListRes2 = AlbumPhotoListRes.builder()
                .photoId(2L)
                .fileId(2L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-2")
                .memberFamilyId(2L)
                .photoAlbumId(2L)
                .build();

        albumPhotoListResList.add(albumPhotoListRes1);
        albumPhotoListResList.add(albumPhotoListRes2);

        given(albumService.addAlbumPhotoList(any(Long.class), any(AddAlbumPhotoListReq.class)))
                .willReturn(albumPhotoListResList);

        // when
        ResultActions result = mockMvc.perform(post("/api/albums/{albumId}/photos", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(readJson("json/album/addAlbumPhotoList.json"))
                        .accept(MediaType.APPLICATION_JSON)
                );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("albumId").description("앨범 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("photoIdList").description("사진 ID 목록").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].photoId").type(JsonFieldType.NUMBER).description("사진 ID"),
                                fieldWithPath("[].fileId").type(JsonFieldType.NUMBER).description("파일 ID"),
                                fieldWithPath("[].imageUrl").type(JsonFieldType.STRING).description("사진 URL"),
                                fieldWithPath("[].memberFamilyId").type(JsonFieldType.NUMBER).description("가족 멤버 ID"),
                                fieldWithPath("[].photoAlbumId").type(JsonFieldType.NUMBER).description("앨범 사진 ID")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void deleteAlbumPhotoList() throws Exception {

        // given
        List<AlbumPhotoListRes> albumPhotoListResList = new ArrayList<>();

        AlbumPhotoListRes albumPhotoListRes1 = AlbumPhotoListRes.builder()
                .photoId(1L)
                .fileId(1L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-1")
                .memberFamilyId(1L)
                .photoAlbumId(1L)
                .build();

        AlbumPhotoListRes albumPhotoListRes2 = AlbumPhotoListRes.builder()
                .photoId(2L)
                .fileId(2L)
                .imageUrl("https://www.gaty.duckdns.org/s3-image-url-2")
                .memberFamilyId(2L)
                .photoAlbumId(2L)
                .build();

        albumPhotoListResList.add(albumPhotoListRes1);
        albumPhotoListResList.add(albumPhotoListRes2);

        given(albumService.deleteAlbumPhotoList(any(Long.class), any(DeleteAlbumPhotoListReq.class)))
                .willReturn(albumPhotoListResList);

        // when
        ResultActions result = mockMvc.perform(patch("/api/albums/{albumId}/photos", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/album/deleteAlbumPhotoList.json"))
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("albumId").description("앨범 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("photoAlbumIdList").description("사진 ID 목록").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].photoId").type(JsonFieldType.NUMBER).description("사진 ID"),
                                fieldWithPath("[].fileId").type(JsonFieldType.NUMBER).description("파일 ID"),
                                fieldWithPath("[].imageUrl").type(JsonFieldType.STRING).description("사진 URL"),
                                fieldWithPath("[].memberFamilyId").type(JsonFieldType.NUMBER).description("가족 멤버 ID"),
                                fieldWithPath("[].photoAlbumId").type(JsonFieldType.NUMBER).description("앨범 사진 ID")
                        )
                ));
    }
}