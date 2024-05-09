package io.ssafy.gatee.global.websocket.application;

import com.google.firebase.database.*;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.firebase.FirebaseInit;
import io.ssafy.gatee.global.redis.dao.OnlineRoomMemberRepository;
import io.ssafy.gatee.global.websocket.dto.ChatDto;
import io.ssafy.gatee.global.websocket.dto.FireStoreChatDto;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_NOT_FOUND;

@Service
@Slf4j
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService {

    private final MemberRepository memberRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final FamilyRepository familyRepository;
    private final DatabaseReference databaseReference;

    private final FamilyService familyService;
    private final OnlineRoomMemberRepository onlineRoomMemberRepository;

    public ChatServiceImpl(MemberRepository memberRepository, MemberFamilyRepository memberFamilyRepository, FamilyRepository familyRepository, OnlineRoomMemberRepository onlineRoomMemberRepository, FirebaseInit firebaseInit, FamilyService familyService) {
        this.memberRepository = memberRepository;
        this.memberFamilyRepository = memberFamilyRepository;
        this.familyRepository = familyRepository;
        firebaseInit.init(); // Firebase 초기화 메서드 호출
        this.databaseReference = FirebaseDatabase.getInstance().getReference();
        this.onlineRoomMemberRepository = onlineRoomMemberRepository;
        this.familyService = familyService;
    }

    @Override
    public void sendMessage(ChatDto chatDto, UUID memberId) throws ExecutionException, InterruptedException {
        // 나중에 추상화
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        Member proxyMember = memberRepository.getReferenceById(memberId);
        log.info("memberId: {}", memberId);
        List<Member> unreadList = memberFamilyRepository.findAllWithFamilyByMember(proxyMember)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND))
                .stream()
                .map(MemberFamily::getMember)
                .toList();
        log.info("unreadList: {}", unreadList);

        // Redis에서 online 가족 가져오기
        List<Member> onlineMember = onlineRoomMemberRepository.findById(familyId)
                .map(onlineRoomMember -> Optional.ofNullable(onlineRoomMember.getOnlineUsers()).orElseGet(Collections::emptySet)) // getOnlineUsers가 null이면 빈 Set을 반환
                .orElseThrow()
                .stream()
                .map(this::findMemberById)
                .toList();
        log.info("onlineMember" + onlineMember);
        // 온라인 멤버를 언리드에서 제거, 오프라인 멤버(안읽은 멤버)만 추가
        List<String> unReadMemberAsStringList = unreadList.stream()
                .filter(offline -> !onlineMember.contains(offline))
                .toList()
                .stream()
                .map(offline -> offline.getId().toString())
                .toList();
        log.info("unReadMemberAsStringList" + unReadMemberAsStringList);
        // 파이어스토어 전송
        this.saveMessageToRealtimeDatabase(FireStoreChatDto.builder()
                .messageType(chatDto.messageType())
                .content(chatDto.content())
                .totalMember(unreadList.size())
                .sender(memberId.toString())
                .unReadMember(unReadMemberAsStringList)
                .build(), familyId);
    }

    @Override
    public void updateRead(UUID memberId, UUID familyId) {
        DatabaseReference reference = databaseReference.child("chat").child(familyId.toString()).child("message");
        log.info("디비" + reference.toString());
        reference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                for (DataSnapshot messageSnapshot : dataSnapshot.getChildren()) {
                    DataSnapshot unreadMemberSnapshot = messageSnapshot.child("unreadMember");
                    if (unreadMemberSnapshot.exists()) {
                        log.info("스냅샷" + unreadMemberSnapshot.toString());
                        List<String> unreadMembers = (List<String>) unreadMemberSnapshot.getValue();
                        if (unreadMembers != null && unreadMembers.contains(memberId.toString())) {
                            unreadMembers.remove(memberId.toString());

                            // 여기서 특정 필드만 업데이트합니다.
                            Map<String, Object> childUpdates = new HashMap<>();
                            childUpdates.put("unreadMember", unreadMembers);

                            messageSnapshot.getRef().updateChildren(childUpdates, new DatabaseReference.CompletionListener() {
                                @Override
                                public void onComplete(DatabaseError databaseError, DatabaseReference databaseReference) {
                                    if (databaseError == null) {
                                        // 데이터 업데이트가 성공적으로 완료되었습니다.
                                        log.info("데이터 업데이트 성공.");
                                    } else {
                                        // 데이터 업데이트 실패
                                        log.info("데이터 업데이트 실패: " + databaseError.getMessage());
                                    }
                                }
                            });
                        }
                    }
                }
            }

            @Override
            public void onCancelled(@NonNull DatabaseError databaseError) {
                log.info("리스너가 취소되었습니다, 오류: " + databaseError.getMessage());
            }
        });
    }


    public void saveMessageToRealtimeDatabase(FireStoreChatDto fireStoreChatDto, UUID familyId) {
        // roomId를 사용하여 채팅방에 대한 참조를 가져옵니다.
        DatabaseReference roomRef = databaseReference.child("chat").child(familyId.toString());

        // 새 메시지를 생성하기 위한 고유 키를 생성합니다.
        String messageId = roomRef.push().getKey();

        // 메시지를 해당 채팅방의 하위 항목으로 저장합니다.
        roomRef.child("messages").child(messageId).setValueAsync(fireStoreChatDto);
    }

    private Member findMemberById(UUID id) {
        return memberRepository.findById(id).orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));
    }
}
