package io.ssafy.gatee.domain.album.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.album.application.AlbumService;
import io.ssafy.gatee.domain.album.dto.request.AddAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.request.AlbumSaveReq;
import io.ssafy.gatee.domain.album.dto.request.DeleteAlbumPhotoListReq;
import io.ssafy.gatee.domain.album.dto.response.AlbumListRes;
import io.ssafy.gatee.domain.album.dto.response.AlbumPhotoListRes;
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
    @DisplayName("앨범 상세 조회 테스트")
    void readAlbumDetail() throws Exception {
        long albumId = 1L;
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
                                fieldWithPath("photoId").type(JsonFieldType.NUMBER).description("사진 ID"),
                                fieldWithPath("fileId").type(JsonFieldType.NUMBER).description("파일 ID"),
                                fieldWithPath("imageUrl").type(JsonFieldType.STRING).description("사진 URL"),
                                fieldWithPath("memberFamilyId").type(JsonFieldType.NUMBER).description("가족 회원 ID"),
                                fieldWithPath("photoAlbumId").type(JsonFieldType.NUMBER).description("앨범 사진 ID")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    @DisplayName("앨범 생성 테스트")
    void saveAlbum() throws Exception {
        AlbumSaveReq albumSaveReq = AlbumSaveReq.builder()
//                .familyId(1L)
                .name("앨범 생성 테스트")
                .build();

        String albumSaveReqJson = objectMapper.writeValueAsString(albumSaveReq);

        mockMvc.perform(post("/api/albums")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(albumSaveReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("앨범 생성"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("앨범 이름 수정 테스트")
    void editAlbumName() throws Exception {
        long albumId = 1L;
        String name = "이름 변경 테스트";

        mockMvc.perform(patch("/api/albums/" + albumId)
                        .param("name", name))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("앨범 이름 수정"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("앨범 삭제 테스트")
    void deleteAlbum() throws Exception {
        long albumId = 1L;

        mockMvc.perform(delete("/api/albums/" + albumId))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("앨범 삭제"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("앨범 내 사진 추가 테스트")
    void addAlbumPhotoList() throws Exception {
        long albumId = 1L;

        List<Long> photoIdList = new ArrayList<>();

        photoIdList.add(1L);
        photoIdList.add(2L);
        photoIdList.add(3L);

        AddAlbumPhotoListReq addAlbumPhotoListReq = AddAlbumPhotoListReq.builder()
                .photoIdList(photoIdList)
                .build();

        String addAlbumPhotoListReqJson = objectMapper.writeValueAsString(addAlbumPhotoListReq);

        mockMvc.perform(post("/api/albums/" + albumId + "/photos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(addAlbumPhotoListReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("앨범 내 사진 추가"))
                .andExpect(status().isOk());
    }

    @Test
    @CustomWithMockUser
    @DisplayName("앨범 내 사진 삭제 테스트")
    void deleteAlbumPhotoList() throws Exception {
        long albumId = 1L;

        List<Long> photoAlbumId = new ArrayList<>();

        photoAlbumId.add(1L);
        photoAlbumId.add(2L);
        photoAlbumId.add(3L);

        DeleteAlbumPhotoListReq deleteAlbumPhotoListReq = DeleteAlbumPhotoListReq.builder()
                .photoAlbumId(photoAlbumId)
                .build();

        String deleteAlbumPhotoListReqJson = objectMapper.writeValueAsString(deleteAlbumPhotoListReq);

        mockMvc.perform(delete("/api/albums/" + albumId + "/photos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(deleteAlbumPhotoListReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("앨범 내 사진 삭제"))
                .andExpect(status().isOk());
    }
}