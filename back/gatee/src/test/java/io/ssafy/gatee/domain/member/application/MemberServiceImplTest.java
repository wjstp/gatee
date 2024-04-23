package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.member.dao.MemberRepository;
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
    @DisplayName("회원 등록 서비스")
    void saveMemberInfo() throws ParseException {
        MemberInfoReq memberInfoReq = MemberInfoReq.builder()
                .memberId(UUID.randomUUID().toString())
                .name("test3")
                .nickname("test3")
                .birth("2020-10-10")
                .birthType("LUNAR")
                .role("MOTHER")
                .build();

//        Mockito.gi
        when(memberRepository.findById(any(UUID.class))).thenReturn(Optional.ofNullable(member));

        memberService.saveMemberInfo(memberInfoReq);

        verify(memberRepository, times(1)).save(any(Member.class));
        verify(memberFamilyRepository, times(1)).save(any(MemberFamily.class));
    }
}