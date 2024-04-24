package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.text.ParseException;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MemberServiceImplTest {

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private MemberFamilyRepository memberFamilyRepository;

    @InjectMocks
    private MemberServiceImpl memberService;

    @Mock
    private Member member;

    @BeforeEach
    public void setup() {
        member = mock(Member.class);
    }

    @Test
    @DisplayName("회원 정보 등록 서비스")
    void saveMemberInfo() {
        MemberSaveReq memberSaveReq = MemberSaveReq.builder()
                .memberId(UUID.randomUUID().toString())
                .name("name")
                .nickname("nickname")
                .birth("2020-10-10")
                .birthType("LUNAR")
                .role("FATHER")
                .build();

//        Mockito.gi
        when(memberRepository.findById(any(UUID.class)))
                .thenReturn(Optional.ofNullable(member));

        memberService.saveMemberInfo(memberSaveReq);

        verify(memberRepository, times(1)).save(any(Member.class));
        verify(memberFamilyRepository, times(1)).save(any(MemberFamily.class));
    }

    @Test
    @DisplayName("회원 정보 수정 서비스")
    void editMemberInfo() {
        MemberEditReq memberEditReq = MemberEditReq.builder()
                .memberId(UUID.randomUUID().toString())
                .name("name")
                .nickname("nickname")
                .birth("2021-10-10")
                .birthType("SOLAR")
                .role("MOTHER")
                .familyId("1")
                .build();

        when(memberRepository.findById(any(UUID.class)))
                .thenReturn(Optional.ofNullable(member));

        memberService.editMemberInfo(memberEditReq);

        verify(memberRepository, times(1)).save(any(Member.class)) ;
        verify(memberFamilyRepository, times(1)).save(any(MemberFamily.class));
    }

    @Test
    @DisplayName("프로필 이미지 수정 서비스")
    void editProfileImage() {
    }

    @Test
    @DisplayName("기분 상태 수정 서비스")
    void editMood() {
        MemberEditMoodReq memberEditMoodReq = MemberEditMoodReq.builder()
                .memberId(UUID.randomUUID().toString())
                .mood("happy")
                .build();

        when(memberRepository.findById(any(UUID.class)))
                .thenReturn(Optional.ofNullable(member));

        memberService.editMood(memberEditMoodReq);

        verify(memberRepository, times(1)).save(any(Member.class));
    }

    @Test
    @DisplayName("회원 정보 조회 서비스")
    void readMemberInfo() {
    }
}