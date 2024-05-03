package io.ssafy.gatee.domain.photo.api;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.photo.application.PhotoService;
import io.ssafy.gatee.domain.photo.dto.request.PhotoListReq;
import io.ssafy.gatee.domain.photo.dto.request.PhotoSaveReq;
import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.security.application.AuthService;
import io.ssafy.gatee.global.security.config.SecurityConfig;
import io.ssafy.gatee.global.security.handler.CustomAccessDeniedHandler;
import io.ssafy.gatee.global.security.handler.CustomOAuth2FailureHandler;
import io.ssafy.gatee.global.security.handler.CustomOAuth2SuccessHandler;
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

import java.util.UUID;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ActiveProfiles({"common, prod"})
@AutoConfigureRestDocs
@WebMvcTest({PhotoController.class, SecurityConfig.class})
@MockBean(JpaMetamodelMappingContext.class)
class PhotoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PhotoService photoService;

    @MockBean
    private JwtService jwtService;

    @MockBean
    private AuthService authService;

    @MockBean
    private CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    @MockBean
    private CustomOAuth2FailureHandler customOAuth2FailureHandler;

    @MockBean
    private CustomAccessDeniedHandler customAccessDeniedHandler;

    @Test
    @CustomWithMockUser
    @DisplayName("사진 목록 조회 테스트")
    void readPhotoList() throws Exception {
        PhotoListReq photoListReq = PhotoListReq.builder()
                .familyId(1L)
                .filter("MONTH")
                .month("4")
                .year("2024")
                .build();

        String photoListReqJson = objectMapper.writeValueAsString(photoListReq);

        mockMvc.perform(get("/api/photos")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(photoListReqJson))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("사진 목록 조회"))
                .andExpect(status().isOk());
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
                .memberFamilyId(1L)
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