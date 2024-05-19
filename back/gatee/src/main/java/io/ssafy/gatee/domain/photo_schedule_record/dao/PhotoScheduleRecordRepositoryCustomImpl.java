package io.ssafy.gatee.domain.photo_schedule_record.dao;

import com.querydsl.jpa.JPQLQueryFactory;
import io.ssafy.gatee.domain.photo.entity.QPhoto;
import io.ssafy.gatee.domain.photo_schedule_record.entity.PhotoScheduleRecord;
import io.ssafy.gatee.domain.photo_schedule_record.entity.QPhotoScheduleRecord;
import io.ssafy.gatee.domain.schedule_record.entity.ScheduleRecord;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
@RequiredArgsConstructor
public class PhotoScheduleRecordRepositoryCustomImpl implements PhotoScheduleRecordRepositoryCustom {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public List<PhotoScheduleRecord> findAllByScheduleRecordList(List<ScheduleRecord> scheduleRecordList) {
        QPhotoScheduleRecord photoScheduleRecord = QPhotoScheduleRecord.photoScheduleRecord;

        return jpqlQueryFactory.selectFrom(photoScheduleRecord)
                .where(photoScheduleRecord.scheduleRecord.in(scheduleRecordList))
                .fetch();
    }
}
