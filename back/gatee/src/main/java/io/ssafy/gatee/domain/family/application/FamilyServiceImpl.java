package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.album.dao.AlbumRepository;
import io.ssafy.gatee.domain.album.entity.Album;
import io.ssafy.gatee.domain.chat_room.dao.ChatRoomRepository;
import io.ssafy.gatee.domain.chat_room.entity.ChatRoom;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.dto.request.FamilyJoinReq;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCheckRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.dto.response.FamilySaveRes;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.file.dao.FileRepository;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.file.entity.type.FileType;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.dto.response.MemberFamilyInfoRes;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.global.exception.error.bad_request.ExistsFamilyException;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCodeException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.redis.dao.OnlineRoomMemberRepository;
import io.ssafy.gatee.global.redis.dto.OnlineRoomMember;
import io.ssafy.gatee.global.s3.util.S3Util;
import jodd.util.StringUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.TimeUnit;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FamilyServiceImpl implements FamilyService {

    private final MemberRepository memberRepository;

    private final FamilyRepository familyRepository;

    private final MemberFamilyRepository memberFamilyRepository;

    private final StringRedisTemplate redisTemplate;

    private final OnlineRoomMemberRepository onlineRoomMemberRepository;

    private final FileRepository fileRepository;

    private final S3Util s3Util;

    private final AlbumRepository albumRepository;

    private final ChatRoomRepository chatRoomRepository;

    private final String DEFAULT_FAMILY_IMAGE_URL = "https://spring-learning.s3.ap-southeast-2.amazonaws.com/default/family.jpg";

    // 가족 생성
    @Override
    @Transactional
    public FamilySaveRes saveFamily(String name, UUID memberId, FileType fileType, MultipartFile file) throws IOException {

        Member member = Member.builder()
                .id(memberId)
                .build();

        if (memberFamilyRepository.existsByMember(member)) {
            throw new ExistsFamilyException(EXISTS_FAMILY);
        }

        File imageFile;

        if (file != null) {
            imageFile = s3Util.upload(fileType, file);
            fileRepository.save(imageFile);
        } else {
            if (fileRepository.existsByUrl(DEFAULT_FAMILY_IMAGE_URL)) {
                imageFile = fileRepository.findByUrl(DEFAULT_FAMILY_IMAGE_URL);
            } else {
                imageFile = fileRepository.save(File.builder()
                        .name("family")
                        .originalName("family.jpg")
                        .url(DEFAULT_FAMILY_IMAGE_URL)
                        .dir("/default")
                        .fileType(FileType.FAMILY_PROFILE)
                        .build());
            }
        }

        ChatRoom chatRoom = ChatRoom.builder().build();

        Family family = familyRepository.save(Family.builder()
                .name(name)
                .file(imageFile)
                .score(0)
                .chatRoom(chatRoom)
                .build());

        chatRoom.saveFamily(family);

        chatRoomRepository.save(chatRoom);

        MemberFamily memberFamily = MemberFamily.builder()
                .member(member)
                .family(family)
                .isLeader(true)
                .build();

        HashSet<UUID> usersSet = new HashSet<>();

        memberFamilyRepository.save(memberFamily);

        onlineRoomMemberRepository.save(OnlineRoomMember.builder()
                .id(family.getId())
                .onlineUsers(usersSet)
                .build());

        Album familyPhotos = Album.builder()
                .family(family)
                .name("가족 사진")
                .build();

        albumRepository.save(familyPhotos);

        Album childPhotos = Album.builder()
                .family(family)
                .name("어린 시절 사진")
                .build();

        albumRepository.save(childPhotos);

        return FamilySaveRes.builder()
                .familyId(family.getId())
                .fileUrl(FileUrlRes.toDto(imageFile))
                .build();
    }

    // 가족 코드 생성
    @Override
    public FamilyCodeRes createFamilyCode(String familyId) {
        int leftLimit = 48; // num '0'
        int rightLimit = 122; // alp 'z'
        int targetStringLength = 8;
        Random random = new Random();

        String randomCode = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        ValueOperations<String, String> redisValueOperation = redisTemplate.opsForValue();

        redisValueOperation.set(randomCode, familyId, 24, TimeUnit.HOURS);

        return FamilyCodeRes.builder()
                .familyCode(randomCode)
                .build();
    }

    @Override
    public UUID getFamilyIdByMemberId(UUID memberId) {
        Member proxyMember = memberRepository.getReferenceById(memberId);
        MemberFamily memberFamily = memberFamilyRepository.findByMember(proxyMember)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));
        return memberFamily.getFamily().getId();
    }

    // 가족 합류
    @Override
    @Transactional
    public void joinFamily(FamilyJoinReq familyJoinReq, UUID memberId) throws ExpiredCodeException {
        ValueOperations<String, String> redisValueOperation = redisTemplate.opsForValue();

        if (StringUtil.isEmpty(redisValueOperation.get(familyJoinReq.familyCode()))) {
            throw new ExpiredCodeException(EXPIRED_CODE);
        } else {
            String familyId = redisValueOperation.get(familyJoinReq.familyCode());

            Member member = memberRepository.getReferenceById(memberId);

            Family family = familyRepository.getReferenceById(UUID.fromString(familyId));

            MemberFamily memberFamily = MemberFamily.builder()
                    .member(member)
                    .family(family)
                    .role(null)
                    .isLeader(false)
                    .score(0)
                    .build();

            memberFamilyRepository.save(memberFamily);
        }
    }

    // 가족 정보 및 구성원 조회
    @Override
    public FamilyInfoRes readFamily(String familyId) throws FamilyNotFoundException {
        Family family = familyRepository.findById(UUID.fromString(familyId)).orElseThrow(() -> new FamilyNotFoundException(FAMILY_NOT_FOUND));
        List<MemberFamily> memberFamilies = memberFamilyRepository.findAllByFamily_Id(UUID.fromString(familyId));
        // 예외
        if (!memberFamilies.isEmpty()) {

            List<MemberFamilyInfoRes> memberFamilyInfoList = memberFamilies.stream().map(memberFamily -> MemberFamilyInfoRes.builder()
                    .memberId(memberFamily.getMember().getId())
                    .memberFamilyId(memberFamily.getId())
                    .birth(memberFamily.getMember().getBirth())
                    .name(memberFamily.getMember().getName())
                    .nickname(memberFamily.getMember().getNickname())
                    .role(memberFamily.getRole())
                    .email(memberFamily.getMember().getEmail())
                    .mood(memberFamily.getMember().getMood())
                    .isLeader(memberFamily.isLeader())
                    .birthType(memberFamily.getMember().getBirthType())
                    .profileImageUrl(Objects.nonNull(memberFamily.getMember().getFile()) ?
                            memberFamily.getMember().getFile().getUrl() : null)
                    .phoneNumber(memberFamily.getMember().getPhoneNumber())
                    .build()).toList();
            return FamilyInfoRes.builder()
                    .name(family.getName())
                    .familyScore(family.getScore())
                    .chatRoomId(family.getChatRoom().getId())
                    .familyImageUrl(Objects.nonNull(family.getFile()) ?
                            family.getFile().getUrl() : null)
                    .memberFamilyInfoList(memberFamilyInfoList)
                    .build();
        }
        throw new FamilyNotFoundException(FAMILY_NOT_FOUND);

    }

    // 가족 이름 수정
    @Override
    @Transactional
    public void editFamilyName(UUID familyId, FamilyNameReq familyNameReq) throws FamilyNotFoundException {
        Family family = familyRepository.findById(familyId)
                .orElseThrow(() -> new FamilyNotFoundException(FAMILY_NOT_FOUND));

        family.editFamilyName(familyNameReq.name());
    }

    @Override
    public FamilyCheckRes checkFamilyCode(String familyCode, UUID memberId) {
        ValueOperations<String, String> redisValueOperation = redisTemplate.opsForValue();

        String familyId = redisValueOperation.get(familyCode.trim());

        if (familyId == null) {
            log.info("family code : " + familyCode);
//            log.info("family id : " + familyId);
            throw new ExpiredCodeException(EXPIRED_CODE);
        } else {
            Family family = familyRepository.findById(UUID.fromString(familyId))
                    .orElseThrow(() -> new FamilyNotFoundException(FAMILY_NOT_FOUND));

            return FamilyCheckRes.builder()
                    .familyId(familyId)
                    .familyName(family.getName())
                    .familyImageUrl(family.getFile().getUrl())
                    .build();
        }
    }

    @Override
    public List<Family> findAllFamily() {
        return familyRepository.findAll();
    }

    // 가족 사진 변경
    @Override
    @Transactional
    public void editFamilyImage(FileType fileType, MultipartFile file, UUID memberId) throws IOException {
        Member member = memberRepository.getReferenceById(memberId);

        MemberFamily memberFamily = memberFamilyRepository.findByMember(member)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        Family family = memberFamily.getFamily();

        File entity;

        if (file != null) {
            entity = s3Util.upload(fileType, file);
            fileRepository.save(entity);
        } else {
            if (fileRepository.existsByUrl(DEFAULT_FAMILY_IMAGE_URL)) {
                entity = fileRepository.findByUrl(DEFAULT_FAMILY_IMAGE_URL);
            } else {
                entity = fileRepository.save(
                        File.builder()
                                .name("family")
                                .originalName("family.jpg")
                                .url(DEFAULT_FAMILY_IMAGE_URL)
                                .dir("/default")
                                .fileType(FileType.FAMILY_PROFILE)
                                .build());
            }
        }

        family.editFamilyImage(entity);
    }
}
