package io.ssafy.gatee.domain.schedule.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QSchedule is a Querydsl query type for Schedule
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QSchedule extends EntityPathBase<Schedule> {

    private static final long serialVersionUID = -2051155105L;

    public static final QSchedule schedule = new QSchedule("schedule");

    public final EnumPath<Category> category = createEnum("category", Category.class);

    public final StringPath content = createString("content");

    public final StringPath emoji = createString("emoji");

    public final DateTimePath<org.joda.time.DateTime> endDate = createDateTime("endDate", org.joda.time.DateTime.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final DateTimePath<org.joda.time.DateTime> startDate = createDateTime("startDate", org.joda.time.DateTime.class);

    public final StringPath title = createString("title");

    public QSchedule(String variable) {
        super(Schedule.class, forVariable(variable));
    }

    public QSchedule(Path<? extends Schedule> path) {
        super(path.getType(), path.getMetadata());
    }

    public QSchedule(PathMetadata metadata) {
        super(Schedule.class, metadata);
    }

}

