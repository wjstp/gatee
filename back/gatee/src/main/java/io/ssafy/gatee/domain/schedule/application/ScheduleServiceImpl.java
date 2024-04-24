package io.ssafy.gatee.domain.schedule.application;

import io.ssafy.gatee.domain.Family_schedule.dao.FamilyScheduleRepository;
import io.ssafy.gatee.domain.Family_schedule.entity.FamilySchedule;
import io.ssafy.gatee.domain.schedule.dao.ScheduleRepository;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleInfoRes;
import io.ssafy.gatee.domain.schedule.dto.response.ScheduleListRes;
import io.ssafy.gatee.domain.schedule.entity.Category;
import io.ssafy.gatee.domain.schedule.entity.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleServiceImpl implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    private final FamilyScheduleRepository familyScheduleRepository;

    // 전체 일정 조회
    @Override
    public ScheduleListRes readSchedule(Long familyId) {
        List<FamilySchedule> familySchedules = familyScheduleRepository.findByFamily_Id(familyId);

        List<ScheduleInfoRes> personalScheduleInfoList = new ArrayList<>();
        List<ScheduleInfoRes> groupScheduleInfoList = new ArrayList<>();


        familySchedules.stream().map((FamilySchedule familySchedule) -> {
                    if (familySchedule.getSchedule().getCategory() == Category.PERSONAL) {
                        return personalScheduleInfoList.add(ScheduleInfoRes.toDto(familySchedule.getSchedule()));
                    } else {
                        return groupScheduleInfoList.add(ScheduleInfoRes.toDto(familySchedule.getSchedule()));
                    }
                });

        return ScheduleListRes.builder()
                .personalScheduleList(personalScheduleInfoList)
                .groupScheduleList(groupScheduleInfoList)
                .build();
    }

    // 일정 상세 조회
    @Override
    public ScheduleInfoRes readScheduleDetail(Long scheduleId) {
        Schedule proxySchedule = scheduleRepository.getReferenceById(scheduleId);

        return null;
    }

}
