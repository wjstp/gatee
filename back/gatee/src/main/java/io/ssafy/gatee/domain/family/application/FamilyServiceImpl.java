package io.ssafy.gatee.domain.family.application;

import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.dto.request.FamilyNameReq;
import io.ssafy.gatee.domain.family.dto.request.FamilySaveReq;
import io.ssafy.gatee.domain.family.dto.response.FamilyCodeRes;
import io.ssafy.gatee.domain.family.dto.response.FamilyInfoRes;
import io.ssafy.gatee.domain.family.dto.response.FamilySaveRes;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.file.application.FileService;
import io.ssafy.gatee.domain.file.dao.FileRepository;
import io.ssafy.gatee.domain.file.dto.FileUrlRes;
import io.ssafy.gatee.domain.file.entity.File;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.dto.response.MemberFamilyInfoRes;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.global.exception.error.bad_request.ExpiredCodeException;
import io.ssafy.gatee.global.exception.error.not_found.FamilyNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.FileNotFoundException;
import io.ssafy.gatee.global.exception.error.not_found.MemberFamilyNotFoundException;
import io.ssafy.gatee.global.redis.dao.OnlineRoomMemberRepository;
import io.ssafy.gatee.global.redis.dto.OnlineRoomMember;
import jodd.util.StringUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.concurrent.TimeUnit;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class FamilyServiceImpl implements FamilyService {

    private final MemberRepository memberRepository;

    private final FamilyRepository familyRepository;

    private final MemberFamilyRepository memberFamilyRepository;

    private final StringRedisTemplate redisTemplate;

    private final OnlineRoomMemberRepository onlineRoomMemberRepository;

    private final FileRepository fileRepository;

    private final String DEFAULT_FAMILY_IMAGE_URL = "https://spring-learning.s3.ap-southeast-2.amazonaws.com/default/family.jpg";

    // 가족 생성
    @Override
    @Transactional
    public FamilySaveRes saveFamily(String name, UUID memberId, FileUrlRes fileUrlRes) {

        Member member = Member.builder()
                .id(memberId)
                .build();

        File file = fileRepository.getReferenceById(fileUrlRes.fileId());

        Family family = familyRepository.save(Family.builder()
                .name(name)
                .file(file)
                .score(0)
                .build());

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

        return FamilySaveRes.builder()
                .familyId(family.getId())
                .fileUrl(fileUrlRes)
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

        redisValueOperation.set(randomCode, familyId, 3, TimeUnit.MINUTES);

        return FamilyCodeRes.builder()
                .familyCode(randomCode)
                .build();
    }

    @Override
    public Long findDefaultFamilyImageId(String url) {
        return fileRepository.findByUrl(url).orElseThrow(() ->
                new FileNotFoundException(FIlE_NOT_FOUND)).getId();
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
    public void joinFamily(String familyCode, UUID memberId) throws ExpiredCodeException {
        ValueOperations<String, String> redisValueOperation = redisTemplate.opsForValue();

        if (StringUtil.isEmpty(redisValueOperation.get(familyCode))) {
            throw new ExpiredCodeException(EXPIRED_CODE);
        } else {
            String familyId = redisValueOperation.get(familyCode);

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
        Family family = familyRepository.findById(UUID.fromString(familyId)).orElseThrow(()-> new FamilyNotFoundException(FAMILY_NOT_FOUND));
        List<MemberFamily> memberFamilies = memberFamilyRepository.findAllByFamily_Id(UUID.fromString(familyId));
        // 예외
        if (! memberFamilies.isEmpty()) {
            List<MemberFamilyInfoRes> memberFamilyInfoList = memberFamilies.stream().map(memberFamily -> MemberFamilyInfoRes.builder()
                    .memberId(memberFamily.getMember().getId())
                    .fileUrl(memberFamily.getMember().getFile().getUrl())
                    .birth(memberFamily.getMember().getBirth())
                    .name(memberFamily.getFamily().getName())
                    .role(memberFamily.getRole())
                    .email(memberFamily.getMember().getEmail())
                    .mood(memberFamily.getMember().getMood())
                    .isLeader(memberFamily.isLeader())
                    .birthType(memberFamily.getMember().getBirthType())
                    .build()).toList();
            return FamilyInfoRes.builder()
                    .name(family.getName())
                    .familyScore(family.getScore())
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
}
