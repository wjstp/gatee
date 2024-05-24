package io.ssafy.gatee.global.websocket.application;

import com.google.firebase.database.*;
import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.appointment.application.AppointmentService;
import io.ssafy.gatee.domain.family.application.FamilyService;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.DataFCMReq;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationFCMReq;
import io.ssafy.gatee.domain.push_notification.entity.Type;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.firebase.FirebaseInit;
import io.ssafy.gatee.global.redis.dao.OnlineRoomMemberRepository;
import io.ssafy.gatee.global.websocket.dto.ChatDto;
import io.ssafy.gatee.global.websocket.dto.FireStoreChatDto;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.ExecutionException;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_NOT_FOUND;
import static io.ssafy.gatee.global.websocket.dto.MessageType.DATE_LINE;

@Service
@Slf4j
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService {

    private final MemberRepository memberRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final DatabaseReference databaseReference;
    private final FamilyService familyService;
    private final OnlineRoomMemberRepository onlineRoomMemberRepository;
    private final AppointmentService appointmentService;
    private final PushNotificationService pushNotificationService;

    public ChatServiceImpl(MemberRepository memberRepository,
                           MemberFamilyRepository memberFamilyRepository,
                           OnlineRoomMemberRepository onlineRoomMemberRepository,
                           FirebaseInit firebaseInit,
                           FamilyService familyService,
                           AppointmentService appointmentService,
                           PushNotificationService pushNotificationService) {
        this.memberRepository = memberRepository;
        this.memberFamilyRepository = memberFamilyRepository;
        firebaseInit.init(); // Firebase 초기화 메서드 호출
        this.databaseReference = FirebaseDatabase.getInstance().getReference();
        this.onlineRoomMemberRepository = onlineRoomMemberRepository;
        this.familyService = familyService;
        this.appointmentService = appointmentService;
        this.pushNotificationService = pushNotificationService;
    }

    @Override
    public void sendMessage(ChatDto chatDto, UUID memberId) throws ExecutionException, InterruptedException, FirebaseMessagingException {
        List<UUID> familyMemberIdList = this.findFamilyMemberIdExceptMe(memberId);
        List<String> unReadMemberAsStringList = this.handleUnreadMember(memberId);
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        // 파이어스토어 전송
        this.saveMessageToRealtimeDatabase(FireStoreChatDto.builder()
                .messageType(chatDto.messageType())
                .content(chatDto.content())
                .sender(memberId.toString())
                .unReadMember(unReadMemberAsStringList)
                .currentTime(chatDto.currentTime())
                .build(), familyId);
        pushNotificationService.sendPushOneToMany(
                PushNotificationFCMReq.builder()
                        .senderId(String.valueOf(memberId))
                        .receiverId(familyMemberIdList)
                        .title("채팅 알림")
                        .content(chatDto.content())
                        .dataFCMReq(DataFCMReq.builder()
                                .type(Type.CHATTING)
                                .build())
                        .build());
    }

    @Override
    public void updateRead(UUID memberId, UUID familyId) {
        DatabaseReference reference = databaseReference.child("chat").child(familyId.toString()).child("messages");
        reference.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(@NonNull DataSnapshot dataSnapshot) {
                for (DataSnapshot messageSnapshot : dataSnapshot.getChildren()) {
                    DataSnapshot unreadMemberSnapshot = messageSnapshot.child("unReadMember");
                    if (unreadMemberSnapshot.getValue() != null) { // 널 체크 추가
                        String unReadMemberStr = unreadMemberSnapshot.getValue().toString();
                        unReadMemberStr = unReadMemberStr.substring(1, unReadMemberStr.length() - 1);
                        String[] items = unReadMemberStr.split(", ");
                        List<String> newList = new ArrayList<>(Arrays.asList(items)); // 수정 가능한 리스트 생성
                        if (newList.contains(memberId.toString())) {
                            newList.remove(memberId.toString()); // 특정 memberId 제거
                            // 리스트를 다시 문자열 형태로 변환해야 할 수도 있음
                            unreadMemberSnapshot.getRef().setValueAsync(newList, "unReadMember"); // 올바른 파라미터 사용
                        }
                    }
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                log.debug("The read failed: " + databaseError.getCode());
            }
        });
    }

    @Override
    @Transactional
    public void createAppointment(ChatDto chatDto, UUID memberId) throws ExecutionException, InterruptedException, FirebaseMessagingException {
        List<String> unReadMemberAsStringList = handleUnreadMember(memberId);
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        List<UUID> familyMemberIdList = this.findFamilyMemberIdExceptMe(memberId);

        log.info("파이어베이스 전송 직전");
        // 파이어스토어 전송
        this.saveMessageToRealtimeDatabase(FireStoreChatDto.builder()
                .messageType(chatDto.messageType())
                .content(chatDto.content())
                .sender(memberId.toString())
                .unReadMember(unReadMemberAsStringList)
                .currentTime(chatDto.currentTime())
                .appointmentId(appointmentService.createAppointment(chatDto, familyId, memberId))
                .build(), familyId);
        pushNotificationService.sendPushOneToMany(
                PushNotificationFCMReq.builder()
                        .senderId(String.valueOf(memberId))
                        .receiverId(familyMemberIdList)
                        .title("약속해요")
                        .content(chatDto.content())
                        .dataFCMReq(DataFCMReq.builder()
                                .type(Type.APPOINTMENT)
                                .build())
                        .build());
    }

    @Override
    @Transactional
    public void sendEmozi(ChatDto chatDto, UUID memberId) throws FirebaseMessagingException {
        List<String> unReadMemberAsStringList = handleUnreadMember(memberId);
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        List<UUID> familyMemberIdList = this.findFamilyMemberIdExceptMe(memberId);
        this.saveMessageToRealtimeDatabase(FireStoreChatDto.builder()
                .messageType(chatDto.messageType())
                .content(chatDto.content())
                .emojiId(chatDto.emojiId().toString())
                .sender(memberId.toString())
                .unReadMember(unReadMemberAsStringList)
                .currentTime(chatDto.currentTime())
                .build(), familyId);
        pushNotificationService.sendPushOneToMany(
                PushNotificationFCMReq.builder()
                        .senderId(String.valueOf(memberId))
                        .receiverId(familyMemberIdList)
                        .title("채팅 알림")
                        .content(chatDto.content())
                        .dataFCMReq(DataFCMReq.builder()
                                .type(Type.CHATTING)
                                .build())
                        .build());
    }

    @Override
    @Transactional
    public void sendImages(ChatDto chatDto, UUID memberId) throws FirebaseMessagingException {
        List<String> unReadMemberAsStringList = handleUnreadMember(memberId);
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        List<UUID> familyMemberIdList = this.findFamilyMemberIdExceptMe(memberId);
        this.saveMessageToRealtimeDatabase(FireStoreChatDto.builder()
                .messageType(chatDto.messageType())
                .files(chatDto.files())
                .sender(memberId.toString())
                .unReadMember(unReadMemberAsStringList)
                .currentTime(chatDto.currentTime())
                .build(), familyId);
        pushNotificationService.sendPushOneToMany(
                PushNotificationFCMReq.builder()
                        .senderId(String.valueOf(memberId))
                        .receiverId(familyMemberIdList)
                        .title("채팅 알림")
                        .content("사진")
                        .dataFCMReq(DataFCMReq.builder()
                                .type(Type.CHATTING)
                                .build())
                        .build());
    }

    @Override
    public void sendDateLine(FireStoreChatDto fireStoreChatDto, UUID familyId) {
        this.saveMessageToRealtimeDatabase(fireStoreChatDto, familyId);
    }

    @Override
    public void sendDateLineToAll() {
        List<Family> allFamily = familyService.findAllFamily();
        allFamily.forEach(family ->
                this.sendDateLine(FireStoreChatDto.builder()
                                .messageType(DATE_LINE)
                                .currentTime(LocalDateTime.now().toString())
                                .build(),
                        family.getId())
        );
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
        return memberRepository.findById(id)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));
    }

    private List<String> handleUnreadMember(UUID memberId) {
        UUID familyId = familyService.getFamilyIdByMemberId(memberId);
        Member proxyMember = memberRepository.getReferenceById(memberId);
        List<Member> unreadList = memberFamilyRepository.findAllWithFamilyByMember(proxyMember)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND))
                .stream()
                .map(MemberFamily::getMember)
                .toList();

        // Redis에서 online 가족 가져오기
        List<Member> onlineMember = onlineRoomMemberRepository.findById(familyId)
                .map(onlineRoomMember -> Optional.ofNullable(onlineRoomMember.getOnlineUsers()).orElseGet(Collections::emptySet)) // getOnlineUsers가 null이면 빈 Set을 반환
                .orElseThrow()
                .stream()
                .map(this::findMemberById)
                .toList();
        return unreadList.stream()
                .filter(offline -> !onlineMember.contains(offline))
                .toList()
                .stream()
                .map(offline -> offline.getId().toString())
                .toList();
    }

    private List<UUID> findFamilyMemberIdExceptMe(UUID memberId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        return memberFamilyRepository.findAllWithFamilyByMember(proxyMember)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND))
                .stream()
                .map(mf -> mf.getMember().getId())
                .filter(id -> !id.equals(memberId))
                .toList();
    }
}
