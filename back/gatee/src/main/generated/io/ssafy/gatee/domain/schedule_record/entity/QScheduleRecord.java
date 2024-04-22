package io.ssafy.gatee.domain.schedule_record.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScheduleRecord is a Querydsl query type for ScheduleRecord
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScheduleRecord extends EntityPathBase<ScheduleRecord> {

    private static final long serialVersionUID = 344180298L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScheduleRecord scheduleRecord = new QScheduleRecord("scheduleRecord");

    public final StringPath content = createString("content");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.schedule.entity.QSchedule schedule;

    public QScheduleRecord(String variable) {
        this(ScheduleRecord.class, forVariable(variable), INITS);
    }

    public QScheduleRecord(Path<? extends ScheduleRecord> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScheduleRecord(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScheduleRecord(PathMetadata metadata, PathInits inits) {
        this(ScheduleRecord.class, metadata, inits);
    }

    public QScheduleRecord(Class<? extends ScheduleRecord> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.schedule = inits.isInitialized("schedule") ? new io.ssafy.gatee.domain.schedule.entity.QSchedule(forProperty("schedule")) : null;
    }

}

