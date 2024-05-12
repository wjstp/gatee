package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.file.dao.FileRepository;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.dto.request.MemberEditMoodReq;
import io.ssafy.gatee.domain.member.dto.request.MemberEditReq;
import io.ssafy.gatee.domain.member.dto.request.MemberSaveReq;
import io.ssafy.gatee.domain.member.dto.request.MemberTokenReq;
import io.ssafy.gatee.domain.member.dto.response.MemberInfoRes;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member.entity.Privilege;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.member_notification.dao.MemberNotificationRepository;
import io.ssafy.gatee.domain.member_notification.entity.MemberNotification;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_FAMILY_NOT_FOUND;
import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
// 기본적으로 조회 로직이 많기 때문에 전체 read only 선언
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final MemberFamilyRepository memberFamilyRepository;

    private final MemberNotificationRepository memberNotificationRepository;

    private final JwtService jwtService;

    private final FileRepository fileRepository;

    private static final List<String> DEFAULT_FATHER_IMAGE = List.of("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/910c8375-f2f7-487e-8adc-7695e04d5b55_profile_man1.PNG", "https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/d136e934-6def-4ab4-8fa2-cbed4a571174_profile_man2.PNG");
    private static final List<String> DEFAULT_MOTHER_IMAGE = List.of("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/d9c78647-80e6-458f-9fa3-604120dbc296_profile_woman1.PNG");
    private static final List<String> DEFAULT_GRANDFATHER_IMAGE = List.of("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/5a3ba20e-c813-467b-a227-fa27682777ec_profile_oldman.PNG");
    private static final List<String> DEFAULT_GRANDMOTHER_IMAGE = List.of("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/1b90ac50-c277-4994-81ba-75118b35f5ba_profile_oldwoman.PNG");
    private static final List<String> DEFAULT_SON_IMAGE = List.of("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/21ecb0f2-8728-4eb1-8d54-316391dc2c1f_profile_boy1.PNG", "https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/6a35c2ab-82c0-4b15-ae00-3682308ab21a_profile_boy2.PNG");
    private static final List<String> DEFAULT_DAUGHTER_IMAGE = List.of("https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/3c1741ec-b401-4a8e-8827-7e2e374d601d_profile_girl1.PNG", "https://spring-learning.s3.ap-southeast-2.amazonaws.com/message/88030a78-4bfe-4f03-97dc-5eb4e0d253cd_profile_girl2.PNG");

    // 회원 가입
    @Override
    @Transactional
    public UUID register(String name, String nickname) {
        Member member = Member.builder()
                .name(name)
                .nickname(nickname)
                .privilege(Privilege.USER)
                .build();

        memberRepository.save(member);

        return member.getId();
    }

    // 회원 정보 저장
    @Override
    @Transactional  // transaction을 사용하기 위해 선언
    public void saveMemberInfo(MemberSaveReq memberSaveReq, UUID memberId, HttpServletResponse response) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        String defaultImage = switch (memberSaveReq.role()) {
            case "엄마" -> DEFAULT_MOTHER_IMAGE.get((int) (Math.random() * 2));
            case "아빠" -> DEFAULT_FATHER_IMAGE.get((int) (Math.random() * 2));
            case "딸" -> DEFAULT_DAUGHTER_IMAGE.get((int) (Math.random() * 2));
            case "할머니" -> DEFAULT_GRANDMOTHER_IMAGE.get(0);
            case "할아버지" -> DEFAULT_GRANDFATHER_IMAGE.get(0);
            default -> DEFAULT_SON_IMAGE.get((int) (Math.random() * 2));  // 아들, default
        };

        File file = fileRepository.saveAndFlush(File.builder()
                .fileType(FileType.MEMBER_PROFILE)
                .url(defaultImage)
                .dir("message")
                .name("default_image")
                .originalName("default_image")
                .build());

        member.saveInfo(memberSaveReq, file);
        MemberFamily memberFamily = memberFamilyRepository.findByMemberAndFamilyId(member, UUID.fromString(memberSaveReq.familyId()))
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        memberFamily.editRole(memberSaveReq.role().toString());
        // 토큰 발급
        modifyMemberToken(member, response);
    }

    @Override
    @Transactional
    public void saveNotificationToken(MemberTokenReq memberTokenReq, UUID memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));
        member.saveNotificationToken(memberTokenReq.notificationToken());
        memberNotificationRepository.save(MemberNotification.builder()
                .member(member)
                .build());
    }

    // 회원 정보 수정
    @Override
    @Transactional
    public void editMemberInfo(MemberEditReq memberEditReq, UUID memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        member.editInfo(memberEditReq);

        MemberFamily memberFamily = memberFamilyRepository.findByMemberAndFamilyId(member, UUID.fromString(memberEditReq.familyId()))
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        memberFamily.editRole(memberEditReq.role());
    }

    // 프로필 이미지 수정
    @Override
    @Transactional
    public void editProfileImage(String imageUrl) {

    }

    // 기분 상태 수정
    @Override
    @Transactional
    public void editMood(MemberEditMoodReq memberEditMoodReq, UUID memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        member.editMood(memberEditMoodReq.mood());
    }

    @Override
    public MemberInfoRes readMemberInfo(UUID memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        MemberFamily memberFamily = memberFamilyRepository.findByMember(member)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        return MemberInfoRes.builder()
                .memberId(member.getId())
                .familyId(memberFamily.getFamily().getId())
                .name(member.getName())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .birth(String.valueOf(member.getBirth()))
                .birthType(String.valueOf(member.getBirthType()))
                .mood(member.getMood())
                .role(String.valueOf(memberFamily.getRole()))
                .build();
    }


    @Override
    public void modifyMemberToken(Member member, HttpServletResponse response) {
        Collection<GrantedAuthority> newAuthorities = new ArrayList<>();
        newAuthorities.add(new SimpleGrantedAuthority(Privilege.USER.name()));
        CustomUserDetails customUserDetails = CustomUserDetails.builder()
                .username(member.getId().toString())
                .privilege(member.getPrivilege().toString())
                .authorities(newAuthorities)
                .password(UUID.randomUUID().toString())
                .isAccountNonLocked(true)
                .isEnabled(true)
                .isCredentialsNonExpired(true)
                .isAccountNonExpired(true)
                .build();

        Authentication authentication = new UsernamePasswordAuthenticationToken(customUserDetails, null, newAuthorities);
        jwtService.publishTokens(response, authentication);
    }
}
