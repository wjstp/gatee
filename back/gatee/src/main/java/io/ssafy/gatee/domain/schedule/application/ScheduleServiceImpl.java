package io.ssafy.gatee.domain.schedule.application;

import io.ssafy.gatee.domain.family.dao.FamilyRepository;
import io.ssafy.gatee.domain.family.entity.Family;
import io.ssafy.gatee.domain.family_schedule.dao.FamilyScheduleRepository;
import io.ssafy.gatee.domain.family_schedule.entity.FamilySchedule;
import io.ssafy.gatee.domain.member.dao.MemberRepository;
import io.ssafy.gatee.domain.member.entity.Member;
import io.ssafy.gatee.domain.member_family_schedule.dao.MemberFamilyScheduleRepository;
import io.ssafy.gatee.domain.member_family_schedule.entity.MemberFamilySchedule;
import io.ssafy.gatee.domain.schedule.dao.ScheduleRepository;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleEditReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleParticipateReq;
import io.ssafy.gatee.domain.schedule.dto.request.ScheduleSaveReq;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.domain.schedule.entity.Category;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import io.ssafy.gatee.global.exception.error.bad_request.DoNotHavePermission;
import io.ssafy.gatee.global.exception.error.not_found.*;
import lombok.RequiredArgsConstructor;
import org.joda.time.LocalDateTime;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

import static io.ssafy.gatee.global.exception.message.ExceptionMessage.*;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final MemberRepository memberRepository;

    private final FamilyRepository familyRepository;

    private final FamilyScheduleRepository familyScheduleRepository;

    private final MemberFamilyScheduleRepository memberFamilyScheduleRepository;

    // 전체 일정 조회
    @Override
    public ScheduleListRes readSchedule(Long familyId) {
        List<FamilySchedule> familySchedules = familyScheduleRepository.findByFamily_Id(familyId);

        List<ScheduleInfoRes> personalScheduleInfoList = new ArrayList<>();
        List<ScheduleInfoRes> groupScheduleInfoList = new ArrayList<>();


        familySchedules.stream().map((FamilySchedule familySchedule) -> {
                    if (familySchedule.getSchedule().getCategory() == Category.PERSONAL) {
                        personalScheduleInfoList.add(ScheduleInfoRes.toDto(familySchedule.getSchedule()));
                    } else {
                        groupScheduleInfoList.add(ScheduleInfoRes.toDto(familySchedule.getSchedule()));
                    }
                    return null;
                });

        return ScheduleListRes.builder()
                .personalScheduleList(personalScheduleInfoList)
                .groupScheduleList(groupScheduleInfoList)
                .build();
    }

    // 일정 상세 조회
    @Override
    public ScheduleInfoRes readScheduleDetail(Long scheduleId) throws ScheduleNotFoundException {
        Schedule schedule = scheduleRepository.findById(scheduleId)
                .orElseThrow(() -> new ScheduleNotFoundException(SCHEDULE_NOT_FOUND));

        return ScheduleInfoRes.toDto(schedule);
    }

    // 일정 등록
    @Override
    public void saveSchedule(ScheduleSaveReq scheduleSaveReq) throws FamilyNotFoundException {
        Schedule schedule = Schedule.builder()
                .category(Category.valueOf(scheduleSaveReq.category()))
                .title(scheduleSaveReq.title())
                .emoji(scheduleSaveReq.emoji())
                .content(scheduleSaveReq.content())
                .startDate(LocalDateTime.parse(scheduleSaveReq.startDate()))
                .endDate(LocalDateTime.parse(scheduleSaveReq.endDate()))
                .build();

        scheduleRepository.save(schedule);

        Member member = memberRepository.findById(scheduleSaveReq.memberId())
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        Family family = familyRepository.findById(Long.valueOf(scheduleSaveReq.familyId()))
                .orElseThrow(() -> new FamilyNotFoundException(FAMILY_NOT_FOUND));

        FamilySchedule familySchedule = FamilySchedule.builder()
                .schedule(schedule)
                .family(family)
                .build();

        familyScheduleRepository.save(familySchedule);

        MemberFamilySchedule memberFamilySchedule = MemberFamilySchedule.builder()
                .member(member)
                .familySchedule(familySchedule)
                .isCreater(true)
                .build();

        memberFamilyScheduleRepository.save(memberFamilySchedule);
    }

    // 일정 수정
    @Override
    public void editSchedule(ScheduleEditReq scheduleEditReq, Long scheduleId)
            throws ScheduleNotFoundException, DoNotHavePermission, FamilyScheduleNotFoundException, MemberFamilyScheduleNotFoundException {
        Member member = memberRepository.findById(scheduleEditReq.memberId())
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        FamilySchedule familySchedule = familyScheduleRepository.findByFamily_IdAndSchedule_Id(Long.valueOf(scheduleEditReq.familyId()), scheduleId)
                .orElseThrow(() -> new FamilyScheduleNotFoundException(FAMILY_SCHEDULE_NOT_FOUND));

        MemberFamilySchedule memberFamilySchedule = memberFamilyScheduleRepository.findByMemberAndFamilySchedule(member, familySchedule)
                .orElseThrow(() -> new MemberFamilyScheduleNotFoundException(MEMBER_FAMILY_SCHEDULE_NOT_FOUND));

        if (memberFamilySchedule.isCreater()) {
            Schedule schedule = scheduleRepository.findById(scheduleId)
                    .orElseThrow(() -> new ScheduleNotFoundException(SCHEDULE_NOT_FOUND));

            schedule.editSchedule(scheduleEditReq);
        } else {
            throw new DoNotHavePermission(DO_NOT_HAVE_REQUEST);
        }
    }

    // 일정 참여
    @Override
    public void participateSchedule(ScheduleParticipateReq scheduleParticipateReq, Long scheduleId)
            throws FamilyScheduleNotFoundException {
        Member member = memberRepository.findById(scheduleParticipateReq.memberId())
                .orElseThrow(() -> new MemberNotFoundException(MEMBER_NOT_FOUND));

        FamilySchedule familySchedule = familyScheduleRepository.findByFamily_IdAndSchedule_Id(Long.valueOf(scheduleParticipateReq.familyId()), scheduleId)
                .orElseThrow(() -> new FamilyScheduleNotFoundException(FAMILY_SCHEDULE_NOT_FOUND));

        memberFamilyScheduleRepository.findByMemberAndFamilySchedule(member, familySchedule)
                .orElseThrow(() -> {
                        MemberFamilySchedule memberFamilySchedule = MemberFamilySchedule.builder()
                            .member(member)
                            .familySchedule(familySchedule)
                            .isCreater(false)
                            .build();

                        memberFamilyScheduleRepository.save(memberFamilySchedule);

                        return null;
                    }
                );
    }
}
