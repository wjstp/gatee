package io.ssafy.gatee.domain.schedule.application;

import com.google.firebase.messaging.FirebaseMessagingException;
import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.family_schedule.dao.FamilyScheduleRepository;
import io.ssafy.gatee.domain.family_schedule.dao.FamilyScheduleRepositoryCustom;
import io.ssafy.gatee.domain.family_schedule.entity.FamilySchedule;
import io.ssafy.gatee.domain.file.dao.FileRepository;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family.dao.MemberFamilyRepository;
import io.ssafy.gatee.domain.member_family.entity.MemberFamily;
import io.ssafy.gatee.domain.member_family_schedule.dao.MemberFamilyScheduleRepository;
import io.ssafy.gatee.domain.member_family_schedule.entity.MemberFamilySchedule;
import io.ssafy.gatee.domain.photo.dao.PhotoRepository;
import io.ssafy.gatee.domain.photo.entity.Photo;
import io.ssafy.gatee.domain.photo_schedule_record.dao.PhotoScheduleRecordRepository;
import io.ssafy.gatee.domain.photo_schedule_record.dao.PhotoScheduleRecordRepositoryCustom;
import io.ssafy.gatee.domain.photo_schedule_record.entity.PhotoScheduleRecord;
import io.ssafy.gatee.domain.push_notification.application.PushNotificationService;
import io.ssafy.gatee.domain.push_notification.dto.request.DataFCMReq;
import io.ssafy.gatee.domain.push_notification.dto.request.PushNotificationFCMReq;
import io.ssafy.gatee.domain.push_notification.entity.Type;
import io.ssafy.gatee.domain.schedule.dao.ScheduleRepository;
import io.ssafy.gatee.domain.schedule.dto.request.*;
import io.ssafy.gatee.domain.schedule.dto.response.ParticipateMemberRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.domain.schedule.entity.Category;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import io.ssafy.gatee.domain.schedule_record.dao.ScheduleRecordRepository;
import io.ssafy.gatee.domain.schedule_record.dto.response.ScheduleRecordPhotoRes;
import io.ssafy.gatee.domain.schedule_record.dto.response.ScheduleRecordRes;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermissionException;
import io.ssafy.gatee.global.exception.error.bad_request.ExistsMemberFamilyScheduleException;
import io.ssafy.gatee.global.exception.error.not_found.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ScheduleRecordRepository scheduleRecordRepository;
    private final MemberRepository memberRepository;
    private final FamilyRepository familyRepository;
    private final MemberFamilyRepository memberFamilyRepository;
    private final FamilyScheduleRepository familyScheduleRepository;
    private final FamilyScheduleRepositoryCustom familyScheduleRepositoryCustom;
    private final MemberFamilyScheduleRepository memberFamilyScheduleRepository;
    private final PhotoRepository photoRepository;
    private final PhotoScheduleRecordRepository photoScheduleRecordRepository;
    private final PhotoScheduleRecordRepositoryCustom photoScheduleRecordRepositoryCustom;
    private final FileRepository fileRepository;
    private final PushNotificationService pushNotificationService;

    // 전체 일정 조회
    @Override
    public List<ScheduleListRes> readSchedule(UUID familyId, Integer month) throws FamilyNotFoundException {
        Family family = familyRepository.getReferenceById(familyId);

        List<Schedule> scheduleList = familyScheduleRepositoryCustom.getAllScheduleList(family, month);

        if (scheduleList.isEmpty()) {
            return new ArrayList<>();
        } else {
            return scheduleList.stream().map(schedule -> {
                FamilySchedule familySchedule = familyScheduleRepository.findByFamilyAndSchedule(family, schedule)
                        .orElse(null);

                List<Member> memberList;

                if (familySchedule == null) {
                    memberList = new ArrayList<>();
                } else {
                    List<MemberFamilySchedule> memberFamilyScheduleList = memberFamilyScheduleRepository.findAllByFamilySchedule(familySchedule)
                            .orElse(null);

                    if (memberFamilyScheduleList != null) {
                        memberList = memberFamilyScheduleList.stream().map(MemberFamilySchedule::getMember).toList();
                    } else {
                        memberList = new ArrayList<>();
                    }
                }

                Integer scheduleRecordCount = scheduleRecordRepository.findAllBySchedule(schedule).size();

                return ScheduleListRes.toDto(schedule, memberList, scheduleRecordCount);
            }).toList();
        }
    }

    // 일정 상세 조회
    @Override
    public ScheduleInfoRes readScheduleDetail(Long scheduleId, UUID familyId) throws ScheduleNotFoundException, FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException {
        Schedule schedule = scheduleRepository.getReferenceById(scheduleId);

        Family family = familyRepository.getReferenceById(familyId);

        FamilySchedule familySchedule = familyScheduleRepository.findByFamilyAndSchedule(family, schedule)
                .orElseThrow(() -> new FamilyScheduleNotFoundException(FAMILY_SCHEDULE_NOT_FOUND));

        List<Member> memberList;

        List<ParticipateMemberRes> participateMembers;

        List<MemberFamilySchedule> memberFamilyScheduleList = memberFamilyScheduleRepository.findAllByFamilySchedule(familySchedule)
                .orElse(new ArrayList<>());

        if (!memberFamilyScheduleList.isEmpty()) {
            memberList = memberFamilyScheduleList.stream().map(MemberFamilySchedule::getMember).toList();

            participateMembers = memberList.stream().map(ParticipateMemberRes::toDto).toList();
        } else {
            participateMembers = new ArrayList<>();

            participateMembers.add(ParticipateMemberRes.builder()
                    .profileImageUrl(null)
                    .nickname(null)
                    .build());
        }

        List<ScheduleRecord> scheduleRecordList = scheduleRecordRepository.findAllBySchedule(schedule);

        List<ScheduleRecordRes> scheduleRecordResList;

        if (scheduleRecordList.isEmpty()) {
            scheduleRecordResList = null;
        } else {
            scheduleRecordResList = scheduleRecordList.stream().map(scheduleRecord -> {
                List<PhotoScheduleRecord> photoScheduleRecordList = photoScheduleRecordRepository.findAllByScheduleRecord(scheduleRecord);

                List<Photo> photoList;

                List<ScheduleRecordPhotoRes> scheduleRecordPhotoResList;

                if (photoScheduleRecordList.isEmpty()) {
                    scheduleRecordPhotoResList = new ArrayList<>();
                } else {
                    photoList = photoScheduleRecordList.stream().map(PhotoScheduleRecord::getPhoto).toList();

                    if (photoList.isEmpty()) {
                        scheduleRecordPhotoResList = new ArrayList<>();
                    } else {
                        scheduleRecordPhotoResList = photoList.stream().map(ScheduleRecordPhotoRes::toDto).toList();
                    }
                }

                return ScheduleRecordRes.toDto(scheduleRecord, scheduleRecordPhotoResList);
            }).toList();
        }

        return ScheduleInfoRes.toDto(schedule, participateMembers, scheduleRecordResList);
    }

    // 일정 등록
    @Override
    @Transactional
    public void saveSchedule(ScheduleSaveReq scheduleSaveReq, UUID memberId) throws FamilyNotFoundException, FirebaseMessagingException {
        Schedule schedule = Schedule.builder()
                .category(scheduleSaveReq.category())
                .title(scheduleSaveReq.title())
                .emoji(scheduleSaveReq.emoji())
                .content(scheduleSaveReq.content())
                .startDate(LocalDateTime.parse(scheduleSaveReq.startDate()))
                .endDate(LocalDateTime.parse(scheduleSaveReq.endDate()))
                .build();

        scheduleRepository.save(schedule);

        Member member = memberRepository.getReferenceById(memberId);

        Family family = familyRepository.getReferenceById(UUID.fromString(scheduleSaveReq.familyId()));

        FamilySchedule familySchedule = FamilySchedule.builder()
                .schedule(schedule)
                .family(family)
                .build();

        familyScheduleRepository.save(familySchedule);

        if (scheduleSaveReq.category().equals(Category.PERSONAL)) {
            MemberFamilySchedule memberFamilySchedule = MemberFamilySchedule.builder()
                    .member(member)
                    .familySchedule(familySchedule)
                    .build();

            memberFamilyScheduleRepository.save(memberFamilySchedule);
        }

        if (!scheduleSaveReq.memberIdList().isEmpty()) {
            List<Member> memberList = scheduleSaveReq.memberIdList().stream().map(memberRepository::getReferenceById).toList();

            List<MemberFamilySchedule> memberFamilyScheduleList = memberList.stream().map(member1 ->
                    MemberFamilySchedule.builder()
                            .member(member1)
                            .familySchedule(familySchedule)
                            .build()
            ).toList();

            memberFamilyScheduleRepository.saveAll(memberFamilyScheduleList);
        }

        // 알림발송
        pushNotificationService.sendPushOneToMany(PushNotificationFCMReq.builder()
                .senderId(String.valueOf(memberId))
                .receiverId(memberFamilyRepository.findMyFamily(memberId))
                .title("일정 등록")
                .content(member.getName() + "님이 일정을 등록하였습니다.")
                .dataFCMReq(DataFCMReq.builder()
                        .type(Type.SCHEDULE)
                        .typeId(schedule.getId()).build())
                .build());
    }

    // 일정 수정
    @Override
    @Transactional
    public void editSchedule(ScheduleEditReq scheduleEditReq, UUID memberId, Long scheduleId)
            throws DoNotHavePermissionException, FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException, FamilyNotFoundException {
        Schedule schedule = scheduleRepository.getReferenceById(scheduleId);

        schedule.editSchedule(scheduleEditReq);
    }

    //일정 삭제
    @Override
    @Transactional
    public void deleteSchedule(Long scheduleId) {
        Schedule schedule = scheduleRepository.getReferenceById(scheduleId);

        List<ScheduleRecord> scheduleRecordList = scheduleRecordRepository.findAllBySchedule(schedule);

        List<PhotoScheduleRecord> photoScheduleRecordList = photoScheduleRecordRepositoryCustom.findAllByScheduleRecordList(scheduleRecordList);

        if (!photoScheduleRecordList.isEmpty()) {
            photoScheduleRecordRepository.deleteAll(photoScheduleRecordList);
        }

        scheduleRecordRepository.deleteAll(scheduleRecordList);

        schedule.deleteData();
    }

    // 일정 참여
    @Override
    @Transactional
    public void participateSchedule(ScheduleParticipateReq scheduleParticipateReq, UUID memberId, Long scheduleId)
            throws FamilyScheduleNotFoundException {
        Member member = memberRepository.getReferenceById(memberId);

        Family family = familyRepository.getReferenceById(UUID.fromString(scheduleParticipateReq.familyId()));

        Schedule schedule = scheduleRepository.getReferenceById(scheduleId);

        FamilySchedule familySchedule = familyScheduleRepository.findByFamilyAndSchedule(family, schedule)
                .orElseThrow(() -> new FamilyScheduleNotFoundException(FAMILY_SCHEDULE_NOT_FOUND));

        if (!memberFamilyScheduleRepository.existsByMemberAndFamilySchedule(member, familySchedule)) {
            MemberFamilySchedule memberFamilySchedule = MemberFamilySchedule.builder()
                    .member(member)
                    .familySchedule(familySchedule)
                    .build();

            memberFamilyScheduleRepository.save(memberFamilySchedule);
        } else {
            throw new ExistsMemberFamilyScheduleException(EXISTS_MEMBER_FAMILY_SCHEDULE);
        }
    }

    // 일정 참여 취소
    @Override
    @Transactional
    public void cancelSchedule(ScheduleCancelReq scheduleCancelReq, UUID memberId, Long scheduleId) throws FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException {
        Member member = memberRepository.getReferenceById(memberId);

        Family family = familyRepository.getReferenceById(UUID.fromString(scheduleCancelReq.familyId()));

        Schedule schedule = scheduleRepository.getReferenceById(scheduleId);

        FamilySchedule familySchedule = familyScheduleRepository.findByFamilyAndSchedule(family, schedule)
                .orElseThrow(() -> new FamilyScheduleNotFoundException(FAMILY_SCHEDULE_NOT_FOUND));

        MemberFamilySchedule memberFamilySchedule = memberFamilyScheduleRepository.findByMemberAndFamilySchedule(member, familySchedule)
                .orElseThrow(() -> new MemberFamilyScheduleNotFoundException(MEMBER_FAMILY_SCHEDULE_NOT_FOUND));

        memberFamilyScheduleRepository.delete(memberFamilySchedule);
    }

    // 일정 후기 등록
    @Override
    @Transactional
    public void saveScheduleRecord(ScheduleSaveRecordReq scheduleSaveRecordReq, UUID memberId, Long scheduleId) {
        Member member = memberRepository.getReferenceById(memberId);

        Family family = familyRepository.getReferenceById(scheduleSaveRecordReq.familyId());

        MemberFamily memberFamily = memberFamilyRepository.findByMemberAndFamily(member, family)
                .orElseThrow(() -> new MemberFamilyNotFoundException(MEMBER_FAMILY_NOT_FOUND));

        Schedule schedule = scheduleRepository.getReferenceById(scheduleId);

        ScheduleRecord scheduleRecord = ScheduleRecord.builder()
                .content(scheduleSaveRecordReq.content())
                .schedule(schedule)
                .member(member)
                .build();

        scheduleRecordRepository.save(scheduleRecord);

        List<Photo> photos = scheduleSaveRecordReq.fileIdList().stream().map(fileId ->
                Photo.builder()
                        .memberFamily(memberFamily)
                        .file(fileRepository.getReferenceById(fileId))
                        .build()).toList();

        List<Photo> photoList = photoRepository.saveAll(photos);

        List<PhotoScheduleRecord> photoScheduleRecordList = photoList.stream().map(photo ->
                PhotoScheduleRecord.builder()
                        .photo(photo)
                        .scheduleRecord(scheduleRecord)
                        .build()).toList();

        photoScheduleRecordRepository.saveAll(photoScheduleRecordList);
    }

    // 일정 후기 삭제
    @Override
    @Transactional
    public void deleteScheduleRecord(Long scheduleId, Long scheduleRecordId, UUID memberId) {
        Member member = memberRepository.getReferenceById(memberId);

        ScheduleRecord scheduleRecord = scheduleRecordRepository.getReferenceById(scheduleRecordId);

        List<PhotoScheduleRecord> photoScheduleRecordList = photoScheduleRecordRepository.findAllByScheduleRecord(scheduleRecord);

        if (scheduleRecord.getMember().equals(member)) {
            photoScheduleRecordRepository.deleteAll(photoScheduleRecordList);
            scheduleRecordRepository.delete(scheduleRecord);
        } else {
            throw new DoNotHavePermissionException(DO_NOT_HAVE_REQUEST);
        }
    }
}
