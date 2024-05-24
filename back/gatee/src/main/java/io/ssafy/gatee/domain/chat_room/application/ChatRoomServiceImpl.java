package io.ssafy.gatee.domain.chat_room.application;

import io.ssafy.gatee.domain.chat_room.dao.ChatRoomRepository;
import io.ssafy.gatee.domain.chat_room.dto.request.ChatRoomSaveReq;
import io.ssafy.gatee.domain.chat_room.entity.ChatRoom;
import io.ssafy.gatee.domain.chat_room_file.dao.ChatRoomFileRepository;
import io.ssafy.gatee.domain.chat_room_file.entity.ChatRoomFile;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.file.dao.FileRepository;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.File;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatRoomServiceImpl implements ChatRoomService {

    private final ChatRoomRepository chatRoomRepository;
    private final FamilyRepository familyRepository;
    private final ChatRoomFileRepository chatRoomFileRepository;
    private final FileRepository fileRepository;

    // 채팅 사진 전체 조회
    @Override
    public List<FileUrlRes> readFileListChatRoom(Long chatroomId) {
        ChatRoom chatRoom = chatRoomRepository.getReferenceById(chatroomId);

        List<ChatRoomFile> chatRoomFileList = chatRoomFileRepository.findAllByChatRoom(chatRoom);

        return chatRoomFileList.stream()
                .map(chatRoomFile -> FileUrlRes.toDto(chatRoomFile.getFile()))
                .toList();
    }

    // 채팅 사진 등록
    @Override
    @Transactional
    public void saveFileListChatRoom(Long chatroomId, ChatRoomSaveReq chatRoomSaveReq) {
        ChatRoom chatRoom = chatRoomRepository.getReferenceById(chatroomId);

        List<File> fileList = chatRoomSaveReq.fileIdList().stream()
                .map(fileRepository::getReferenceById)
                .toList();

        List<ChatRoomFile> chatRoomFileList = fileList.stream()
                .map(file -> ChatRoomFile.builder()
                        .chatRoom(chatRoom)
                        .file(file)
                        .build())
                .toList();

        chatRoomFileRepository.saveAll(chatRoomFileList);
    }
}
