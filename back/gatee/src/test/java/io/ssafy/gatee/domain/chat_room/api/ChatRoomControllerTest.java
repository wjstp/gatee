package io.ssafy.gatee.domain.chat_room.api;

import io.ssafy.gatee.config.restdocs.RestDocsTestSupport;
import io.ssafy.gatee.config.security.CustomWithMockUser;
import io.ssafy.gatee.domain.chat_room.application.ChatRoomService;
import io.ssafy.gatee.domain.chat_room.dto.request.ChatRoomSaveReq;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
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

import static org.mockito.BDDMockito.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



@Slf4j
@ActiveProfiles("test")
@WebMvcTest({ChatRoomController.class})
@MockBean(JpaMetamodelMappingContext.class)
class ChatRoomControllerTest extends RestDocsTestSupport {

    @MockBean
    private ChatRoomService chatRoomService;

    @Test
    @CustomWithMockUser
    void readFileListChatRoom() throws Exception {

        // given
        List<FileUrlRes> fileUrlResList = new ArrayList<>();

        FileUrlRes fileUrlRes1 = FileUrlRes.builder()
                .fileId(1L)
                .imageUrl("https://gaty.duckdns.org/s3-image-url-1")
                .build();

        FileUrlRes fileUrlRes2 = FileUrlRes.builder()
                .fileId(2L)
                .imageUrl("https://gaty.duckdns.org/s3-image-url-2")
                .build();

        fileUrlResList.add(fileUrlRes1);
        fileUrlResList.add(fileUrlRes2);

        given(chatRoomService.readFileListChatRoom(any(Long.class)))
                .willReturn(fileUrlResList);

        // when
        ResultActions result = mockMvc.perform(get("/api/chatroom/{chatroomId}", 1L));

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("chatroomId").description("채팅 방 ID").optional()
                        ),
                        responseFields(
                                fieldWithPath("[].fileId").type(JsonFieldType.NUMBER).description("파일 ID"),
                                fieldWithPath("[].imageUrl").type(JsonFieldType.STRING).description("파일 URL")
                        )
                ));
    }

    @Test
    @CustomWithMockUser
    void saveFileListChatRoom() throws Exception {

        // given
        doNothing().when(chatRoomService).saveFileListChatRoom(any(Long.class), any(ChatRoomSaveReq.class));

        // when
        ResultActions result = mockMvc.perform(post("/api/chatroom/{chatroomId}", 1L)
                .contentType(MediaType.APPLICATION_JSON)
                .content(readJson("json/chat_room/saveFileListChatRoom.json"))
                .accept(MediaType.APPLICATION_JSON)
        );

        // then
        result.andExpect(status().isOk())
                .andDo(restDocs.document(
                        pathParameters(
                                parameterWithName("chatroomId").description("채팅 방 ID").optional()
                        ),
                        queryParameters(
                                parameterWithName("fileIdList").description("파일 ID 목록").optional()
                        )
                ));
    }
}