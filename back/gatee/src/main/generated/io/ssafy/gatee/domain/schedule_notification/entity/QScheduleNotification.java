package io.ssafy.gatee.domain.schedule_notification.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QScheduleNotification is a Querydsl query type for ScheduleNotification
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScheduleNotification extends EntityPathBase<ScheduleNotification> {

    private static final long serialVersionUID = -649550146L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QScheduleNotification scheduleNotification = new QScheduleNotification("scheduleNotification");

    public final io.ssafy.gatee.domain.base.QBaseEntity _super = new io.ssafy.gatee.domain.base.QBaseEntity(this);

    //inherited
    public final DateTimePath<java.time.LocalDateTime> createdAt = _super.createdAt;

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final io.ssafy.gatee.domain.notification.entity.QNotification notification;

    public final io.ssafy.gatee.domain.schedule.entity.QSchedule schedule;

    //inherited
    public final BooleanPath status = _super.status;

    //inherited
    public final DateTimePath<java.time.LocalDateTime> updatedAt = _super.updatedAt;

    public QScheduleNotification(String variable) {
        this(ScheduleNotification.class, forVariable(variable), INITS);
    }

    public QScheduleNotification(Path<? extends ScheduleNotification> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QScheduleNotification(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QScheduleNotification(PathMetadata metadata, PathInits inits) {
        this(ScheduleNotification.class, metadata, inits);
    }

    public QScheduleNotification(Class<? extends ScheduleNotification> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.notification = inits.isInitialized("notification") ? new io.ssafy.gatee.domain.notification.entity.QNotification(forProperty("notification")) : null;
        this.schedule = inits.isInitialized("schedule") ? new io.ssafy.gatee.domain.schedule.entity.QSchedule(forProperty("schedule"), inits.get("schedule")) : null;
    }

}

