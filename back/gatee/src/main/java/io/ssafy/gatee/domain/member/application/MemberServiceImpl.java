package io.ssafy.gatee.domain.member.application;

import io.ssafy.gatee.domain.album.dao.AlbumRepository;
import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
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
import io.ssafy.gatee.domain.mission.dao.MissionRepository;
import io.ssafy.gatee.domain.mission.entity.Mission;
import io.ssafy.gatee.domain.mission.entity.Type;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberNotFoundException;
import io.ssafy.gatee.global.jwt.application.JwtService;
import io.ssafy.gatee.global.s3.util.S3Util;
import io.ssafy.gatee.global.security.user.CustomUserDetails;
import jakarta.servlet.http.HttpServletResponse;
import jodd.util.StringUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_FAMILY_NOT_FOUND;
import static io.ssafy.gatee.global.exception.message.ExceptionMessage.MEMBER_NOT_FOUND;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final MemberNotificationRepository memberNotificationRepository;
    private final AlbumRepository albumRepository;
    private final JwtService jwtService;
    private final FileRepository fileRepository;
    private final MissionRepository missionRepository;
    private final S3Util s3Util;

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

        Family family = familyRepository.getReferenceById(UUID.fromString(memberSaveReq.familyId()));

        member.saveInfo(memberSaveReq);
        MemberFamily memberFamily = memberFamilyRepository.findByMemberAndFamily(member, family)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        memberFamily.editRole(memberSaveReq.role());

        Album album = Album.builder()
                .family(family)
                .name(memberSaveReq.name())
                .build();

        albumRepository.save(album);

        // 알림 동의 모두 열기
        memberNotificationRepository.save(MemberNotification.builder()
                .member(member)
                .albumNotification(true)
                .scheduleNotification(true)
                .chatNotification(true)
                .featureNotification(true)
                .naggingNotification(true).build());

        Mission albumMission = Mission.builder()
                .type(Type.ALBUM)
                .nowRange(0)
                .maxRange(10)
                .completedLevel(0)
                .isComplete(false)
                .member(member)
                .build();

        Mission examMission = Mission.builder()
                .type(Type.EXAM)
                .nowRange(0)
                .maxRange(1)
                .completedLevel(0)
                .isComplete(false)
                .member(member)
                .build();

        Mission featureMission = Mission.builder()
                .type(Type.FEATURE)
                .nowRange(0)
                .maxRange(10)
                .completedLevel(0)
                .isComplete(false)
                .member(member)
                .build();

        Mission scheduleMission = Mission.builder()
                .type(Type.SCHEDULE)
                .nowRange(0)
                .maxRange(1)
                .completedLevel(0)
                .isComplete(false)
                .member(member)
                .build();

        List<Mission> missionList = new ArrayList<>();

        missionList.add(albumMission);
        missionList.add(examMission);
        missionList.add(featureMission);
        missionList.add(scheduleMission);

        missionRepository.saveAll(missionList);


        // 토큰 발급
        modifyMemberToken(member, response);

    }

    @Override
    @Transactional
    public void saveNotificationToken(MemberTokenReq memberTokenReq, UUID memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));
        member.saveNotificationToken(memberTokenReq.notificationToken());
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
    public void editProfileImage(String defaultImage, FileType fileType, MultipartFile file, UUID memberId) throws IOException {

        File entity;

        if (StringUtil.isEmpty(defaultImage) && !file.isEmpty()) {
            entity = s3Util.upload(fileType, file);
            fileRepository.save(entity);

        } else {
            String s3ImageUrl = "https://spring-learning.s3.ap-southeast-2.amazonaws.com/default/profile_" + defaultImage + ".PNG";

            if (fileRepository.existsByUrl(s3ImageUrl)) {
                entity = fileRepository.findByUrl(s3ImageUrl);
            } else {
                entity = fileRepository.save(File.builder()
                        .fileType(FileType.MEMBER_PROFILE)
                        .url(s3ImageUrl)
                        .dir("default/")
                        .name("default_image")
                        .originalName("default_image")
                        .build());
            }
        }

        Member member = memberRepository.getReferenceById(memberId);

        member.editProfileImage(entity);
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
                .memberFamilyId(memberFamily.getId())
                .familyId(memberFamily.getFamily().getId())
                .name(member.getName())
                .email(member.getEmail())
                .nickname(member.getNickname())
                .birth(String.valueOf(member.getBirth()))
                .birthType(String.valueOf(member.getBirthType()))
                .mood(member.getMood())
                .role(String.valueOf(memberFamily.getRole()))
                .profileImageUrl(member.getFile().getUrl())
                .phoneNumber(member.getPhoneNumber())
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
