package io.ssafy.gatee.global.websocket.application;

import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.websocket.dto.ChatDto;
import io.ssafy.gatee.global.websocket.dto.FireStoreChatDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ChatServiceImpl implements ChatService {

    private final MemberRepository memberRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final FamilyRepository familyRepository;

    @Override
    public void sendMessage(ChatDto chatDto) {
        // total Member 구하기
        UUID memberId = UUID.fromString(chatDto.sender());
        Member member = memberRepository.getReferenceById(memberId);
        List<MemberFamily> memberFamilyList = memberFamilyRepository.findAllWithFamilyByMember(member)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));
        // 가족 수 가져오기
        Integer familyCount = memberFamilyList.size();

        // 전체 가족 가져오기
        List<Member> unreadList = memberFamilyList.stream()
                .map(MemberFamily::getMember)
                .toList();

        // Redis에서 online 가족 가져오기
//        List<Member> onlineMember = onlineRepository.findByFamilyId(memberFamily.getFamily().getId());
        // 온라인 멤버를 언리드에서 제거, 오프라인 멤버(안읽은 멤버)만 추가
//        unreadList.removeAll(onlineMember);

        FireStoreChatDto fireStoreChatDto = FireStoreChatDto.builder()
                .messageType(chatDto.messageType())
                .content(chatDto.content())
                .totalMember(familyCount)
//                .unReadMember(unreadList)
                .build();
        // 파이어스토어 전송

    }
}
